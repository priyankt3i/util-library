import React, { useState } from 'react';

const CaseConverter: React.FC = () => {
    const [text, setText] = useState('');

    const toSentenceCase = () => {
        return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    };
    
    const toTitleCase = () => {
        return text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    
    const caseButtons = [
        { name: 'UPPERCASE', action: () => setText(text.toUpperCase()) },
        { name: 'lowercase', action: () => setText(text.toLowerCase()) },
        { name: 'Sentence case', action: () => setText(toSentenceCase()) },
        { name: 'Title Case', action: () => setText(toTitleCase()) },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <label htmlFor="case-converter-input" className="cyber-label">
                    Your Text
                </label>
                <textarea
                    id="case-converter-input"
                    rows={8}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste or type your text here..."
                    className="cyber-textarea"
                />
            </div>
            <div className="flex-gap">
                {caseButtons.map(btn => (
                    <button
                        key={btn.name}
                        onClick={btn.action}
                        disabled={!text}
                        className="cyber-button"
                        style={{padding: '0.5rem 1rem', fontSize: '0.9rem'}}
                    >
                        {btn.name}
                    </button>
                ))}
                 <button
                    onClick={() => setText('')}
                    disabled={!text}
                    className="cyber-button"
                    style={{borderColor: '#FF4747', color: '#FF4747', padding: '0.5rem 1rem', fontSize: '0.9rem'}}
                >
                    Clear
                </button>
            </div>
        </div>
    );
};

export default CaseConverter;