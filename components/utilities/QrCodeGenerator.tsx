import React, { useState, useEffect } from 'react';

// Extend the Window interface to include QRCode
declare global {
    interface Window {
        QRCode: any;
    }
}

const QrCodeGenerator: React.FC = () => {
    const [text, setText] = useState('https://react.dev');
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    const generateQrCode = () => {
        if (text && window.QRCode) {
            window.QRCode.toDataURL(text, { width: 300, margin: 2, errorCorrectionLevel: 'H' }, (err: Error, url: string) => {
                if (err) console.error(err);
                setQrCodeUrl(url);
            });
        }
    };
    
    useEffect(() => {
        generateQrCode();
    }, [text]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{width: '100%', maxWidth: '400px'}}>
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
            
            {qrCodeUrl && (
                <div style={{padding: '1rem', background: 'white', borderRadius: '4px'}}>
                    <img src={qrCodeUrl} alt="Generated QR Code" width="256" height="256" />
                </div>
            )}

            {qrCodeUrl && (
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