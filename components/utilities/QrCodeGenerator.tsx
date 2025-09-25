import React, { useState } from 'react';
import Button from '../common/Button';

// Extend the Window interface to include QRCode
declare global {
    interface Window {
        QRCode: any;
    }
}

const QrCodeGenerator: React.FC = () => {
    const [text, setText] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateClick = () => {
        if (!text.trim()) {
            setQrCodeUrl('');
            setError('Input text cannot be empty.');
            return;
        }

        // Check if the library is loaded at the time of action
        if (typeof window.QRCode === 'undefined') {
            setError('QR Code library failed to load. Please try refreshing the page.');
            setIsGenerating(false);
            return;
        }
        
        setIsGenerating(true);
        setError(null);
        setQrCodeUrl(''); // Clear previous QR code while generating

        window.QRCode.toDataURL(text, { width: 300, margin: 2, errorCorrectionLevel: 'H' }, (err: Error | null, url: string) => {
            setIsGenerating(false);
            if (err) {
                console.error(err);
                setError('Failed to generate QR Code. The input may be too long.');
                setQrCodeUrl('');
            } else {
                setQrCodeUrl(url);
            }
        });
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                    <label htmlFor="qr-input" className="cyber-label">
                        URL or Text
                    </label>
                    <input
                        id="qr-input"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter URL or text to encode"
                        className="cyber-input"
                    />
                </div>
                 <Button onClick={handleGenerateClick} disabled={!text || isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </Button>
            </div>
            
            <div style={{
                width: '288px',
                height: '288px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.9)',
                borderRadius: '4px',
                border: '1px solid var(--border-color)'
            }}>
                {isGenerating && <span style={{color: 'var(--background-dark)'}}>Generating...</span>}
                {error && !isGenerating && <span style={{color: '#c0392b', padding: '1rem', textAlign: 'center'}}>{error}</span>}
                {qrCodeUrl && !error && !isGenerating && (
                    <img src={qrCodeUrl} alt="Generated QR Code" width="256" height="256" />
                )}
                {!qrCodeUrl && !error && !isGenerating && (
                    <span style={{color: 'var(--text-secondary)', padding: '1rem', textAlign: 'center'}}>
                        Enter text and click 'Generate' to create a QR code.
                    </span>
                )}
            </div>

            {qrCodeUrl && !error && !isGenerating && (
                <a
                    href={qrCodeUrl}
                    download="qrcode.png"
                    className="cyber-button"
                >
                    Download QR Code
                </a>
            )}
        </div>
    );
};

export default QrCodeGenerator;