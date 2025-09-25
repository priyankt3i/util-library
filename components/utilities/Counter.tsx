import React, { useState, useMemo } from 'react';

const Counter: React.FC = () => {
    const [text, setText] = useState('');

    const stats = useMemo(() => {
        if (!text) {
            return { characters: 0, words: 0, sentences: 0, paragraphs: 0 };
        }
        const characters = text.length;
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const sentences = text.match(/[.!?]+(\s|$)/g)?.length || 0;
        const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0).length;
        
        return { characters, words, sentences, paragraphs };
    }, [text]);

    const statItems = [
        { label: 'Characters', value: stats.characters },
        { label: 'Words', value: stats.words },
        { label: 'Sentences', value: stats.sentences },
        { label: 'Paragraphs', value: stats.paragraphs },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem'}}>
                {statItems.map(item => (
                    <div key={item.label} style={{border: '1px solid var(--border-color)', padding: '1rem', textAlign: 'center'}}>
                        <div style={{fontSize: '2rem', color: 'var(--neon-green)', fontFamily: 'var(--font-heading)'}}>{item.value}</div>
                        <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem'}}>{item.label}</div>
                    </div>
                ))}
            </div>
            <div>
                <label htmlFor="counter-input" className="cyber-label">
                    Your Text
                </label>
                <textarea
                    id="counter-input"
                    rows={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste or type your text here to see the stats..."
                    className="cyber-textarea"
                />
            </div>
        </div>
    );
};

export default Counter;