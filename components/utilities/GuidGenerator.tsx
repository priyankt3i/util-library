import React, { useState, useEffect } from 'react';
import Button from '../common/Button';

const GuidGenerator: React.FC = () => {
    const [guid, setGuid] = useState('');
    const [copied, setCopied] = useState(false);

    const generateGuid = () => {
        const newGuid = crypto.randomUUID();
        setGuid(newGuid);
        setCopied(false); // Reset copied state when a new GUID is generated
    };

    // Generate a GUID on initial component mount
    useEffect(() => {
        generateGuid();
    }, []);

    const copyToClipboard = () => {
        if (!guid) return;
        navigator.clipboard.writeText(guid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{position: 'relative'}}>
                 <label htmlFor="guid-output" className="cyber-label">
                    Generated GUID (UUID v4)
                </label>
                <input
                    id="guid-output"
                    type="text"
                    readOnly
                    value={guid}
                    className="cyber-input"
                    style={{paddingRight: '80px', fontSize: '1.1rem'}}
                />
                <button
                    onClick={copyToClipboard}
                    style={{
                        position: 'absolute', 
                        top: '2.2rem', 
                        right: '0.5rem', 
                        padding: '0.4rem 0.8rem', 
                        fontSize: '0.8rem', 
                        background: 'var(--background-panel)', 
                        color: 'var(--text-secondary)', 
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        borderRadius: '2px'
                    }}
                    disabled={!guid}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div>
                <Button onClick={generateGuid}>Generate New GUID</Button>
            </div>
        </div>
    );
};

export default GuidGenerator;