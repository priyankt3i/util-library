import React, { useState } from 'react';
import Button from '../common/Button';

type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-512';

// Simple MD5 implementation for demonstration, as it's not in Web Crypto.
// In a real app, a library would be better. This is a simplified version.
// For this app, we'll omit MD5 to rely solely on browser-native Web Crypto API.

const HashGenerator: React.FC = () => {
    const [input, setInput] = useState('');
    const [hashes, setHashes] = useState<Record<string, string> | null>(null);

    const generateHashes = async () => {
        if (!input) return;
        
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        
        const algorithms: HashAlgorithm[] = ['SHA-1', 'SHA-256', 'SHA-512'];
        const newHashes: Record<string, string> = {};

        for (const algorithm of algorithms) {
            try {
                const hashBuffer = await crypto.subtle.digest(algorithm, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                newHashes[algorithm] = hashHex;
            } catch (error) {
                console.error(`Error generating ${algorithm} hash:`, error);
                newHashes[algorithm] = 'Error generating hash';
            }
        }
        setHashes(newHashes);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
                <label htmlFor="hash-input" className="cyber-label">
                    Input Text
                </label>
                <textarea
                    id="hash-input"
                    rows={5}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Enter text to hash..."
                    className="cyber-textarea"
                />
            </div>
            <div>
                <Button onClick={generateHashes} disabled={!input}>Generate Hashes</Button>
            </div>
            {hashes && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Object.entries(hashes).map(([algo, hash]) => (
                        <div key={algo}>
                            <label className="cyber-label">{algo}</label>
                            <input
                                type="text"
                                readOnly
                                value={hash}
                                className="cyber-input"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default HashGenerator;