import React, { useState } from 'react';
import Button from '../common/Button';

const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LoremIpsumGenerator: React.FC = () => {
    const [paragraphs, setParagraphs] = useState(3);
    const [generatedText, setGeneratedText] = useState('');
    const [copied, setCopied] = useState(false);

    const generateText = () => {
        const text = Array(paragraphs).fill(LOREM_IPSUM).join('\n\n');
        setGeneratedText(text);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="input-grid">
                <div style={{flexGrow: 1}}>
                    <label htmlFor="paragraphs" className="cyber-label">
                        Number of Paragraphs
                    </label>
                    <input
                        type="number"
                        id="paragraphs"
                        min="1"
                        max="20"
                        value={paragraphs}
                        onChange={(e) => setParagraphs(Math.max(1, parseInt(e.target.value, 10)))}
                        className="cyber-input"
                    />
                </div>
                <Button onClick={generateText}>Generate</Button>
            </div>

            {generatedText && (
                <div>
                    <div style={{position: 'relative'}}>
                        <textarea
                            rows={12}
                            value={generatedText}
                            readOnly
                            className="cyber-textarea"
                        />
                         <button 
                            onClick={copyToClipboard}
                            style={{
                                position: 'absolute', 
                                top: '0.75rem', 
                                right: '0.75rem', 
                                padding: '0.4rem 0.8rem', 
                                fontSize: '0.8rem', 
                                background: 'var(--background-panel)', 
                                color: 'var(--text-secondary)', 
                                border: '1px solid var(--border-color)',
                                cursor: 'pointer',
                                borderRadius: '2px'
                            }}
                         >
                            {copied ? 'Copied!' : 'Copy'}
                         </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoremIpsumGenerator;