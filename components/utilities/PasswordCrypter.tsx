import React, { useState } from 'react';
import Button from '../common/Button';

const PasswordCrypter: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleEncrypt = () => {
        setError('');
        setOutput('');
        try {
            const encrypted = btoa(input);
            setOutput(encrypted);
        } catch (e) {
            setError('Could not encrypt the input. Make sure it is valid text.');
        }
    };

    const handleDecrypt = () => {
        setError('');
        setOutput('');
        try {
            const decrypted = atob(input);
            setOutput(decrypted);
        } catch (e) {
            setError('Could not decrypt the input. Make sure it is a valid Base64 string.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{background: 'rgba(255, 165, 0, 0.1)', border: '1px solid orange', color: 'orange', padding: '1rem', borderRadius: '4px'}} role="alert">
                <strong style={{fontWeight: 'bold'}}>Warning!</strong>
                {/* Fix: Removed invalid 'sm' property from inline style. */}
                <span style={{display: 'block', marginLeft: '0.5rem'}}>This tool uses Base64 encoding, which is NOT secure encryption. Do not use it for sensitive passwords or data.</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <div>
                    <label htmlFor="crypter-input" className="cyber-label">
                        Input
                    </label>
                    <textarea
                        id="crypter-input"
                        rows={4}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Enter text to encrypt or decrypt"
                        className="cyber-textarea"
                    />
                </div>
                 <div className="flex-gap">
                    <Button onClick={handleEncrypt} disabled={!input}>Encrypt</Button>
                    <Button onClick={handleDecrypt} disabled={!input}>Decrypt</Button>
                </div>

                {error && <p style={{color: '#FF4747'}}>{error}</p>}

                {output && (
                    <div>
                        <label htmlFor="crypter-output" className="cyber-label">
                            Output
                        </label>
                         <textarea
                            id="crypter-output"
                            rows={4}
                            value={output}
                            readOnly
                            className="cyber-textarea"
                            style={{color: 'var(--neon-green)'}}
                         />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordCrypter;