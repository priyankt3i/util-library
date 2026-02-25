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
            <div>
                 <label htmlFor="guid-output" className="cyber-label">
                    Generated GUID (UUID v4)
                </label>
                <div className="input-action-row">
                    <input
                        id="guid-output"
                        type="text"
                        readOnly
                        value={guid}
                        className="cyber-input"
                        style={{fontSize: '1.1rem'}}
                    />
                    <button
                        type="button"
                        onClick={copyToClipboard}
                        className="cyber-button cyber-button-compact"
                        disabled={!guid}
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            </div>
            <div>
                <Button onClick={generateGuid}>Generate New GUID</Button>
            </div>
        </div>
    );
};

export default GuidGenerator;
