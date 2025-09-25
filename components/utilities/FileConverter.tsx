import React, { useState, useMemo } from 'react';
import Button from '../common/Button';
import Select from '../common/Select';

// Add required libraries to the global window scope for TypeScript
declare global {
    interface Window {
        jspdf: any;
        pdfjsLib: any;
    }
}

type Format = 'PNG' | 'JPG' | 'PDF';

const CONVERSION_MAP: Record<Format, { accepts: string; outputs: Format[]; mime: string; extension: string; }> = {
    'PNG': { accepts: 'image/png', outputs: ['JPG', 'PDF'], mime: 'image/png', extension: '.png' },
    'JPG': { accepts: 'image/jpeg', outputs: ['PNG', 'PDF'], mime: 'image/jpeg', extension: '.jpg' },
    'PDF': { accepts: 'application/pdf', outputs: ['PNG', 'JPG'], mime: 'application/pdf', extension: '.pdf' },
};

const FileConverter: React.FC = () => {
    const [fromFormat, setFromFormat] = useState<Format>('PNG');
    const [toFormat, setToFormat] = useState<Format>('JPG');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'converting' | 'success' | 'error'>('idle');
    const [outputUrl, setOutputUrl] = useState<string | null>(null);
    const [outputFilename, setOutputFilename] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const availableToFormats = useMemo(() => {
        const formats = CONVERSION_MAP[fromFormat].outputs;
        if (!formats.includes(toFormat)) {
            setToFormat(formats[0]);
        }
        return formats;
    }, [fromFormat, toFormat]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setStatus('idle');
            setOutputUrl(null);
            setErrorMessage(null);
        }
    };
    
    const fileToDataUrl = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    const handleConvert = async () => {
        if (!file) return;

        setStatus('converting');
        setErrorMessage(null);
        setOutputUrl(null);
        
        try {
            const newFilename = `${file.name.split('.').slice(0, -1).join('.')}${CONVERSION_MAP[toFormat].extension}`;
            setOutputFilename(newFilename);

            // Image to Image
            if ((fromFormat === 'PNG' || fromFormat === 'JPG') && (toFormat === 'JPG' || toFormat === 'PNG')) {
                const imageUrl = await fileToDataUrl(file);
                const img = new Image();
                img.src = imageUrl;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (!ctx) throw new Error("Could not get canvas context");
                    ctx.drawImage(img, 0, 0);
                    const dataUrl = canvas.toDataURL(CONVERSION_MAP[toFormat].mime);
                    setOutputUrl(dataUrl);
                    setStatus('success');
                };
            }
            // Image to PDF
            else if ((fromFormat === 'PNG' || fromFormat === 'JPG') && toFormat === 'PDF') {
                 const { jsPDF } = window.jspdf;
                 const imageUrl = await fileToDataUrl(file);
                 const img = new Image();
                 img.src = imageUrl;
                 img.onload = () => {
                     const pdf = new jsPDF({
                         orientation: img.width > img.height ? 'l' : 'p',
                         unit: 'px',
                         format: [img.width, img.height]
                     });
                     pdf.addImage(imageUrl, 'auto', 0, 0, img.width, img.height);
                     setOutputUrl(pdf.output('datauristring'));
                     setStatus('success');
                 };
            }
            // PDF to Image
            else if (fromFormat === 'PDF' && (toFormat === 'PNG' || toFormat === 'JPG')) {
                const reader = new FileReader();
                reader.onload = async (event) => {
                    if (!event.target?.result) return;
                    const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
                    const pdf = await window.pdfjsLib.getDocument(typedArray).promise;
                    const page = await pdf.getPage(1); // convert first page
                    const viewport = page.getViewport({ scale: 2.0 });
                    
                    const canvas = document.createElement('canvas');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    const context = canvas.getContext('2d');
                    if (!context) throw new Error("Could not get canvas context");

                    await page.render({ canvasContext: context, viewport: viewport }).promise;
                    setOutputUrl(canvas.toDataURL(CONVERSION_MAP[toFormat].mime));
                    setStatus('success');
                };
                reader.readAsArrayBuffer(file);
            } else {
                 throw new Error("Conversion path not supported.");
            }

        } catch (error: any) {
            setErrorMessage(`Conversion failed: ${error.message}`);
            setStatus('error');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Fix: Replaced invalid 'md' property with a responsive CSS grid layout. */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                <Select id="from-format" label="Convert From" value={fromFormat} onChange={e => setFromFormat(e.target.value as Format)}>
                    {Object.keys(CONVERSION_MAP).map(f => <option key={f} value={f}>{f}</option>)}
                </Select>
                <Select id="to-format" label="Convert To" value={toFormat} onChange={e => setToFormat(e.target.value as Format)}>
                    {availableToFormats.map(f => <option key={f} value={f}>{f}</option>)}
                </Select>
            </div>

            <div>
                 <label htmlFor="file-upload" className="cyber-label">
                    Upload File
                </label>
                <div style={{marginTop: '0.25rem', display: 'flex', justifyContent: 'center', padding: '1.5rem 1.25rem', border: '2px dashed var(--border-color)', borderRadius: '4px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', textAlign: 'center'}}>
                        <svg style={{margin: '0 auto', height: '3rem', width: '3rem', color: 'var(--text-secondary)'}} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div style={{display: 'flex', fontSize: '0.9rem', color: 'var(--text-secondary)'}}>
                            <label htmlFor="file-upload" style={{position: 'relative', cursor: 'pointer', background: 'var(--background-panel)', borderRadius: '4px', fontWeight: '500', color: 'var(--neon-green)'}}>
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0}} onChange={handleFileChange} accept={CONVERSION_MAP[fromFormat].accepts} />
                            </label>
                            <p style={{paddingLeft: '0.25rem'}}>or drag and drop</p>
                        </div>
                         {file ? <p style={{fontSize: '0.9rem', color: 'var(--text-primary)', paddingTop: '0.5rem'}}>{file.name}</p> : <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)'}}>Max file size 10MB</p>}
                    </div>
                </div>
            </div>

            <Button onClick={handleConvert} disabled={!file || status === 'converting'}>
                {status === 'converting' ? 'Converting...' : 'Convert File'}
            </Button>

            {status === 'error' && errorMessage && (
                 <div style={{background: 'rgba(255, 71, 71, 0.1)', border: '1px solid #FF4747', color: '#FF9494', padding: '1rem', borderRadius: '4px'}} role="alert">
                    <strong style={{fontWeight: 'bold'}}>Error:</strong>
                    {/* Fix: Removed invalid 'sm' property from inline style. */}
                    <span style={{display: 'block', marginLeft: '0.5rem'}}>{errorMessage}</span>
                </div>
            )}
            
            {status === 'success' && outputUrl && (
                 <div style={{textAlign: 'center', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', border: '1px solid var(--border-color)'}}>
                    <h3 style={{fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '1rem'}}>Conversion Successful!</h3>
                     <a
                        href={outputUrl}
                        download={outputFilename}
                        className="cyber-button"
                    >
                        Download {outputFilename}
                    </a>
                </div>
            )}

        </div>
    );
};

export default FileConverter;