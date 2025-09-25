import React, { useState } from 'react';
import Button from '../common/Button';

const JsonFormatter: React.FC = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');

    const handleFormat = () => {
        setError('');
        try {
            if (!jsonInput.trim()) return;
            const parsed = JSON.parse(jsonInput);
            const formatted = JSON.stringify(parsed, null, 2);
            setJsonInput(formatted);
        } catch (e: any) {
            setError(`Invalid JSON: ${e.message}`);
        }
    };
    
    const handleClear = () => {
        setJsonInput('');
        setError('');
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             <div>
                <label htmlFor="json-input" className="cyber-label">
                    JSON Input
                </label>
                <textarea
                    id="json-input"
                    rows={15}
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='Paste your JSON here...'
                    className="cyber-textarea"
                    style={error ? { borderColor: '#FF4747' } : {}}
                />
            </div>
            {error ? (
                <div style={{background: 'rgba(255, 71, 71, 0.1)', border: '1px solid #FF4747', color: '#FF9494', padding: '1rem', borderRadius: '4px'}} role="alert">
                    <strong style={{fontWeight: 'bold'}}>Error:</strong>
                    {/* Fix: Removed invalid 'sm' property from inline style. */}
                    <span style={{display: 'block', marginLeft: '0.5rem'}}>{error}</span>
                </div>
            ) : (
                 <div style={{background: 'rgba(175, 255, 0, 0.1)', border: '1px solid var(--border-color)', color: 'var(--neon-green)', padding: '1rem', borderRadius: '4px'}} role="alert">
                    {jsonInput.trim() ? "JSON appears to be valid." : "Waiting for JSON input."}
                </div>
            )}
            <div className="flex-gap">
                <Button onClick={handleFormat} disabled={!jsonInput}>Format JSON</Button>
                <Button
                    onClick={handleClear}
                    disabled={!jsonInput}
                    style={{borderColor: 'var(--text-secondary)', color: 'var(--text-secondary)'}}
                >
                    Clear
                </Button>
            </div>
        </div>
    );
};

export default JsonFormatter;