import React, { useEffect, useMemo, useRef, useState } from 'react';
import Button from '../common/Button';

type DiffKind = 'equal' | 'changed' | 'added' | 'removed';
type InlineKind = 'equal' | 'added' | 'removed';

interface InlineSegment {
    text: string;
    kind: InlineKind;
}

interface DiffRow {
    id: number;
    kind: DiffKind;
    leftLine: string | null;
    rightLine: string | null;
    leftIndex: number | null;
    rightIndex: number | null;
    leftInsertAt: number;
    rightInsertAt: number;
    leftInline: InlineSegment[];
    rightInline: InlineSegment[];
}

interface CompareOptions {
    ignoreCase: boolean;
    ignoreWhitespace: boolean;
}

const splitLines = (text: string): string[] => {
    const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (!normalized) {
        return [];
    }
    return normalized.split('\n');
};

const joinLines = (lines: string[]): string => lines.join('\n');

const normalizeLine = (line: string, options: CompareOptions): string => {
    let value = line;
    if (options.ignoreWhitespace) {
        value = value.replace(/\s+/g, ' ').trim();
    }
    if (options.ignoreCase) {
        value = value.toLowerCase();
    }
    return value;
};

const mergeSegments = (segments: InlineSegment[]): InlineSegment[] => {
    if (segments.length === 0) {
        return [];
    }

    const merged: InlineSegment[] = [segments[0]];
    for (let i = 1; i < segments.length; i += 1) {
        const prev = merged[merged.length - 1];
        const current = segments[i];
        if (prev.kind === current.kind) {
            prev.text += current.text;
        } else {
            merged.push({ ...current });
        }
    }

    return merged;
};

const buildInlineSegments = (leftLine: string, rightLine: string): { left: InlineSegment[]; right: InlineSegment[] } => {
    if (leftLine === rightLine) {
        return {
            left: [{ text: leftLine, kind: 'equal' }],
            right: [{ text: rightLine, kind: 'equal' }],
        };
    }

    const leftChars = Array.from(leftLine);
    const rightChars = Array.from(rightLine);
    const n = leftChars.length;
    const m = rightChars.length;
    const area = (n + 1) * (m + 1);

    // For very large lines, keep highlighting simple to avoid slowdowns.
    if (area > 40000) {
        let prefix = 0;
        while (prefix < n && prefix < m && leftChars[prefix] === rightChars[prefix]) {
            prefix += 1;
        }

        let suffix = 0;
        while (
            suffix < n - prefix &&
            suffix < m - prefix &&
            leftChars[n - 1 - suffix] === rightChars[m - 1 - suffix]
        ) {
            suffix += 1;
        }

        const leftSegments: InlineSegment[] = [];
        const rightSegments: InlineSegment[] = [];

        const commonStart = leftChars.slice(0, prefix).join('');
        const leftChanged = leftChars.slice(prefix, n - suffix).join('');
        const rightChanged = rightChars.slice(prefix, m - suffix).join('');
        const commonEnd = leftChars.slice(n - suffix).join('');

        if (commonStart) {
            leftSegments.push({ text: commonStart, kind: 'equal' });
            rightSegments.push({ text: commonStart, kind: 'equal' });
        }
        if (leftChanged) {
            leftSegments.push({ text: leftChanged, kind: 'removed' });
        }
        if (rightChanged) {
            rightSegments.push({ text: rightChanged, kind: 'added' });
        }
        if (commonEnd) {
            leftSegments.push({ text: commonEnd, kind: 'equal' });
            rightSegments.push({ text: commonEnd, kind: 'equal' });
        }

        return {
            left: mergeSegments(leftSegments),
            right: mergeSegments(rightSegments),
        };
    }

    const lcs = new Uint32Array((n + 1) * (m + 1));
    const idx = (i: number, j: number) => i * (m + 1) + j;

    for (let i = n - 1; i >= 0; i -= 1) {
        for (let j = m - 1; j >= 0; j -= 1) {
            if (leftChars[i] === rightChars[j]) {
                lcs[idx(i, j)] = lcs[idx(i + 1, j + 1)] + 1;
            } else {
                const down = lcs[idx(i + 1, j)];
                const right = lcs[idx(i, j + 1)];
                lcs[idx(i, j)] = down >= right ? down : right;
            }
        }
    }

    const leftSegments: InlineSegment[] = [];
    const rightSegments: InlineSegment[] = [];
    let i = 0;
    let j = 0;

    while (i < n && j < m) {
        if (leftChars[i] === rightChars[j]) {
            leftSegments.push({ text: leftChars[i], kind: 'equal' });
            rightSegments.push({ text: rightChars[j], kind: 'equal' });
            i += 1;
            j += 1;
        } else if (lcs[idx(i + 1, j)] >= lcs[idx(i, j + 1)]) {
            leftSegments.push({ text: leftChars[i], kind: 'removed' });
            i += 1;
        } else {
            rightSegments.push({ text: rightChars[j], kind: 'added' });
            j += 1;
        }
    }

    while (i < n) {
        leftSegments.push({ text: leftChars[i], kind: 'removed' });
        i += 1;
    }

    while (j < m) {
        rightSegments.push({ text: rightChars[j], kind: 'added' });
        j += 1;
    }

    return {
        left: mergeSegments(leftSegments),
        right: mergeSegments(rightSegments),
    };
};

const buildDiffRows = (leftText: string, rightText: string, options: CompareOptions): DiffRow[] => {
    const leftLines = splitLines(leftText);
    const rightLines = splitLines(rightText);
    const leftNormalized = leftLines.map((line) => normalizeLine(line, options));
    const rightNormalized = rightLines.map((line) => normalizeLine(line, options));

    const n = leftNormalized.length;
    const m = rightNormalized.length;
    const matrix = new Uint32Array((n + 1) * (m + 1));
    const idx = (i: number, j: number) => i * (m + 1) + j;

    for (let i = n - 1; i >= 0; i -= 1) {
        for (let j = m - 1; j >= 0; j -= 1) {
            if (leftNormalized[i] === rightNormalized[j]) {
                matrix[idx(i, j)] = matrix[idx(i + 1, j + 1)] + 1;
            } else {
                const down = matrix[idx(i + 1, j)];
                const right = matrix[idx(i, j + 1)];
                matrix[idx(i, j)] = down >= right ? down : right;
            }
        }
    }

    const matches: Array<{ left: number; right: number }> = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
        if (leftNormalized[i] === rightNormalized[j]) {
            matches.push({ left: i, right: j });
            i += 1;
            j += 1;
        } else if (matrix[idx(i + 1, j)] >= matrix[idx(i, j + 1)]) {
            i += 1;
        } else {
            j += 1;
        }
    }

    const rows: DiffRow[] = [];
    let leftCursor = 0;
    let rightCursor = 0;
    let rowId = 0;

    const pushRow = (kind: DiffKind, leftIndex: number | null, rightIndex: number | null) => {
        const leftLine = leftIndex !== null ? leftLines[leftIndex] : null;
        const rightLine = rightIndex !== null ? rightLines[rightIndex] : null;
        const inline = kind === 'changed' && leftLine !== null && rightLine !== null
            ? buildInlineSegments(leftLine, rightLine)
            : {
                left: [{ text: leftLine ?? '', kind: 'equal' as const }],
                right: [{ text: rightLine ?? '', kind: 'equal' as const }],
            };

        rows.push({
            id: rowId,
            kind,
            leftLine,
            rightLine,
            leftIndex,
            rightIndex,
            leftInsertAt: leftCursor,
            rightInsertAt: rightCursor,
            leftInline: inline.left,
            rightInline: inline.right,
        });
        rowId += 1;
    };

    matches.forEach((match) => {
        while (leftCursor < match.left || rightCursor < match.right) {
            const hasLeft = leftCursor < match.left;
            const hasRight = rightCursor < match.right;

            if (hasLeft && hasRight) {
                pushRow('changed', leftCursor, rightCursor);
                leftCursor += 1;
                rightCursor += 1;
            } else if (hasLeft) {
                pushRow('removed', leftCursor, null);
                leftCursor += 1;
            } else {
                pushRow('added', null, rightCursor);
                rightCursor += 1;
            }
        }

        pushRow('equal', leftCursor, rightCursor);
        leftCursor += 1;
        rightCursor += 1;
    });

    while (leftCursor < n || rightCursor < m) {
        const hasLeft = leftCursor < n;
        const hasRight = rightCursor < m;

        if (hasLeft && hasRight) {
            pushRow('changed', leftCursor, rightCursor);
            leftCursor += 1;
            rightCursor += 1;
        } else if (hasLeft) {
            pushRow('removed', leftCursor, null);
            leftCursor += 1;
        } else {
            pushRow('added', null, rightCursor);
            rightCursor += 1;
        }
    }

    return rows;
};

const TextCompare: React.FC = () => {
    const [pastedText, setPastedText] = useState('');
    const [actualText, setActualText] = useState('');
    const [comparedPasted, setComparedPasted] = useState('');
    const [comparedActual, setComparedActual] = useState('');
    const [autoCompare, setAutoCompare] = useState(true);
    const [ignoreCase, setIgnoreCase] = useState(false);
    const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
    const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
    const [syncScroll, setSyncScroll] = useState(true);
    const [activeDiffCursor, setActiveDiffCursor] = useState(0);

    const leftPaneRef = useRef<HTMLDivElement | null>(null);
    const rightPaneRef = useRef<HTMLDivElement | null>(null);
    const leftRowRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const rightRowRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const syncSourceRef = useRef<'left' | 'right' | null>(null);

    useEffect(() => {
        if (autoCompare) {
            setComparedPasted(pastedText);
            setComparedActual(actualText);
        }
    }, [autoCompare, pastedText, actualText]);

    const diffRows = useMemo(
        () => buildDiffRows(comparedPasted, comparedActual, { ignoreCase, ignoreWhitespace }),
        [comparedPasted, comparedActual, ignoreCase, ignoreWhitespace]
    );

    const visibleRows = useMemo(
        () => showOnlyDifferences ? diffRows.filter((row) => row.kind !== 'equal') : diffRows,
        [diffRows, showOnlyDifferences]
    );

    const diffRowIds = useMemo(
        () => visibleRows.filter((row) => row.kind !== 'equal').map((row) => row.id),
        [visibleRows]
    );

    const activeRowId = diffRowIds.length > 0 ? diffRowIds[activeDiffCursor] : null;

    useEffect(() => {
        if (activeDiffCursor >= diffRowIds.length) {
            setActiveDiffCursor(0);
        }
    }, [activeDiffCursor, diffRowIds.length]);

    useEffect(() => {
        if (activeRowId === null) {
            return;
        }

        const leftNode = leftRowRefs.current[activeRowId];
        const rightNode = rightRowRefs.current[activeRowId];
        leftNode?.scrollIntoView({ block: 'center' });
        rightNode?.scrollIntoView({ block: 'center' });
    }, [activeRowId]);

    const summary = useMemo(() => {
        return diffRows.reduce(
            (acc, row) => {
                acc[row.kind] += 1;
                return acc;
            },
            { equal: 0, changed: 0, added: 0, removed: 0 } as Record<DiffKind, number>
        );
    }, [diffRows]);

    const totalComparedRows = diffRows.length;

    const handleCompareNow = () => {
        setComparedPasted(pastedText);
        setComparedActual(actualText);
    };

    const setBothTexts = (nextPasted: string, nextActual: string, forceRefresh = false) => {
        setPastedText(nextPasted);
        setActualText(nextActual);
        if (autoCompare || forceRefresh) {
            setComparedPasted(nextPasted);
            setComparedActual(nextActual);
        }
    };

    const handleSwap = () => {
        setBothTexts(actualText, pastedText, true);
    };

    const handleClear = () => {
        setBothTexts('', '', true);
        setActiveDiffCursor(0);
    };

    const copyWholeSide = (direction: 'left-to-right' | 'right-to-left') => {
        if (direction === 'left-to-right') {
            setBothTexts(pastedText, pastedText, true);
        } else {
            setBothTexts(actualText, actualText, true);
        }
    };

    const copyRow = (row: DiffRow, direction: 'left-to-right' | 'right-to-left') => {
        if (direction === 'left-to-right' && row.leftIndex !== null) {
            const leftLines = splitLines(pastedText);
            const rightLines = splitLines(actualText);
            const value = leftLines[row.leftIndex] ?? '';
            if (row.rightIndex !== null) {
                rightLines[row.rightIndex] = value;
            } else {
                rightLines.splice(row.rightInsertAt, 0, value);
            }
            setBothTexts(joinLines(leftLines), joinLines(rightLines), true);
        }

        if (direction === 'right-to-left' && row.rightIndex !== null) {
            const leftLines = splitLines(pastedText);
            const rightLines = splitLines(actualText);
            const value = rightLines[row.rightIndex] ?? '';
            if (row.leftIndex !== null) {
                leftLines[row.leftIndex] = value;
            } else {
                leftLines.splice(row.leftInsertAt, 0, value);
            }
            setBothTexts(joinLines(leftLines), joinLines(rightLines), true);
        }
    };

    const jumpDiff = (step: number) => {
        if (diffRowIds.length === 0) {
            return;
        }
        setActiveDiffCursor((current) => (current + step + diffRowIds.length) % diffRowIds.length);
    };

    const syncPanels = (source: 'left' | 'right', scrollTop: number, scrollLeft: number) => {
        const target = source === 'left' ? rightPaneRef.current : leftPaneRef.current;
        if (!target) {
            return;
        }
        target.scrollTop = scrollTop;
        target.scrollLeft = scrollLeft;
    };

    const handleScroll = (source: 'left' | 'right', event: React.UIEvent<HTMLDivElement>) => {
        if (!syncScroll) {
            return;
        }
        if (syncSourceRef.current && syncSourceRef.current !== source) {
            return;
        }

        syncSourceRef.current = source;
        const element = event.currentTarget;
        syncPanels(source, element.scrollTop, element.scrollLeft);
        window.requestAnimationFrame(() => {
            syncSourceRef.current = null;
        });
    };

    const renderInline = (segments: InlineSegment[], side: 'left' | 'right') => {
        return segments.map((segment, index) => {
            let className = '';
            if (segment.kind === 'added' && side === 'right') {
                className = 'compare-inline-added';
            }
            if (segment.kind === 'removed' && side === 'left') {
                className = 'compare-inline-removed';
            }
            return (
                <span key={`${segment.kind}-${index}`} className={className}>
                    {segment.text}
                </span>
            );
        });
    };

    const getRowClass = (row: DiffRow, side: 'left' | 'right') => {
        if (row.kind === 'equal') {
            return 'is-equal';
        }
        if (row.kind === 'changed') {
            return 'is-changed';
        }
        if (row.kind === 'added') {
            return side === 'right' ? 'is-added' : 'is-gap';
        }
        return side === 'left' ? 'is-removed' : 'is-gap';
    };

    return (
        <div className="text-compare-root">
            <div className="compare-toolbar">
                <div className="compare-toolbar-group">
                    <Button onClick={handleCompareNow}>Compare</Button>
                    <Button onClick={handleSwap} disabled={!pastedText && !actualText}>Swap Sides</Button>
                    <Button onClick={handleClear} disabled={!pastedText && !actualText}>Clear</Button>
                </div>
                <div className="compare-toolbar-group">
                    <Button onClick={() => copyWholeSide('left-to-right')} disabled={!pastedText}>Copy Pasted to Actual</Button>
                    <Button onClick={() => copyWholeSide('right-to-left')} disabled={!actualText}>Copy Actual to Pasted</Button>
                </div>
            </div>

            <div className="compare-option-grid">
                <label className="compare-checkbox">
                    <input type="checkbox" checked={autoCompare} onChange={(e) => setAutoCompare(e.target.checked)} />
                    Auto Compare
                </label>
                <label className="compare-checkbox">
                    <input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} />
                    Ignore Case
                </label>
                <label className="compare-checkbox">
                    <input type="checkbox" checked={ignoreWhitespace} onChange={(e) => setIgnoreWhitespace(e.target.checked)} />
                    Ignore Whitespace
                </label>
                <label className="compare-checkbox">
                    <input type="checkbox" checked={showOnlyDifferences} onChange={(e) => setShowOnlyDifferences(e.target.checked)} />
                    Show Differences Only
                </label>
                <label className="compare-checkbox">
                    <input type="checkbox" checked={syncScroll} onChange={(e) => setSyncScroll(e.target.checked)} />
                    Sync Scrolling
                </label>
            </div>

            <div className="compare-input-grid">
                <div className="compare-input-pane">
                    <label htmlFor="compare-pasted" className="cyber-label">Pasted / Incoming Text</label>
                    <textarea
                        id="compare-pasted"
                        className="cyber-textarea compare-textarea"
                        value={pastedText}
                        onChange={(e) => setPastedText(e.target.value)}
                        placeholder="Paste text that you want to compare..."
                        spellCheck={false}
                    />
                </div>
                <div className="compare-input-pane">
                    <label htmlFor="compare-actual" className="cyber-label">Actual / Baseline Text</label>
                    <textarea
                        id="compare-actual"
                        className="cyber-textarea compare-textarea"
                        value={actualText}
                        onChange={(e) => setActualText(e.target.value)}
                        placeholder="Paste actual text here..."
                        spellCheck={false}
                    />
                </div>
            </div>

            <div className="compare-status-bar">
                <div className="compare-status-chips">
                    <span className="compare-chip">Rows: {totalComparedRows}</span>
                    <span className="compare-chip compare-chip-changed">Changed: {summary.changed}</span>
                    <span className="compare-chip compare-chip-added">Added: {summary.added}</span>
                    <span className="compare-chip compare-chip-removed">Removed: {summary.removed}</span>
                </div>
                <div className="compare-nav">
                    <Button onClick={() => jumpDiff(-1)} disabled={diffRowIds.length === 0}>Prev Diff</Button>
                    <span className="compare-nav-label">
                        {diffRowIds.length === 0 ? 'No differences' : `Diff ${activeDiffCursor + 1} / ${diffRowIds.length}`}
                    </span>
                    <Button onClick={() => jumpDiff(1)} disabled={diffRowIds.length === 0}>Next Diff</Button>
                </div>
            </div>

            <div className="compare-results-grid">
                <div className="compare-result-pane">
                    <div className="compare-pane-title">Pasted / Incoming</div>
                    <div
                        className="compare-pane-scroll"
                        ref={leftPaneRef}
                        onScroll={(event) => handleScroll('left', event)}
                    >
                        {visibleRows.length === 0 ? (
                            <div className="compare-empty-state">Paste text into one or both panes to start comparing.</div>
                        ) : (
                            visibleRows.map((row) => {
                                const isActive = activeRowId === row.id;
                                return (
                                    <div
                                        key={`left-${row.id}`}
                                        ref={(element) => { leftRowRefs.current[row.id] = element; }}
                                        className={`compare-line-row ${getRowClass(row, 'left')} ${isActive ? 'is-active' : ''}`}
                                    >
                                        <div className="compare-line-number">{row.leftIndex !== null ? row.leftIndex + 1 : ''}</div>
                                        <div className="compare-line-text">
                                            {row.leftLine === null ? <span className="compare-empty-line"> </span> : renderInline(row.leftInline, 'left')}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="compare-gutter">
                    <div className="compare-pane-title">Actions</div>
                    <div className="compare-gutter-scroll">
                        {visibleRows.map((row) => {
                            const isActive = activeRowId === row.id;
                            return (
                                <div key={`gutter-${row.id}`} className={`compare-gutter-row ${row.kind} ${isActive ? 'is-active' : ''}`}>
                                    {row.kind !== 'equal' ? (
                                        <div className="compare-gutter-buttons">
                                            {row.rightIndex !== null && (
                                                <button
                                                    type="button"
                                                    className="compare-mini-btn"
                                                    title="Copy Actual line to Pasted line"
                                                    onClick={() => copyRow(row, 'right-to-left')}
                                                >
                                                    {'<'}
                                                </button>
                                            )}
                                            {row.leftIndex !== null && (
                                                <button
                                                    type="button"
                                                    className="compare-mini-btn"
                                                    title="Copy Pasted line to Actual line"
                                                    onClick={() => copyRow(row, 'left-to-right')}
                                                >
                                                    {'>'}
                                                </button>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="compare-gutter-placeholder"> </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="compare-result-pane">
                    <div className="compare-pane-title">Actual / Baseline</div>
                    <div
                        className="compare-pane-scroll"
                        ref={rightPaneRef}
                        onScroll={(event) => handleScroll('right', event)}
                    >
                        {visibleRows.length === 0 ? (
                            <div className="compare-empty-state">Paste text into one or both panes to start comparing.</div>
                        ) : (
                            visibleRows.map((row) => {
                                const isActive = activeRowId === row.id;
                                return (
                                    <div
                                        key={`right-${row.id}`}
                                        ref={(element) => { rightRowRefs.current[row.id] = element; }}
                                        className={`compare-line-row ${getRowClass(row, 'right')} ${isActive ? 'is-active' : ''}`}
                                    >
                                        <div className="compare-line-number">{row.rightIndex !== null ? row.rightIndex + 1 : ''}</div>
                                        <div className="compare-line-text">
                                            {row.rightLine === null ? <span className="compare-empty-line"> </span> : renderInline(row.rightInline, 'right')}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextCompare;
