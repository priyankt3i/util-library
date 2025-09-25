import React, { useState } from 'react';
import ResultBox from '../common/ResultBox';
import Button from '../common/Button';

const RandomNumberGenerator: React.FC = () => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [randomNumber, setRandomNumber] = useState<number | null>(null);

    const generateRandomNumber = () => {
        const minVal = Math.ceil(min);
        const maxVal = Math.floor(max);
        if (minVal > maxVal) {
            setRandomNumber(null);
            return;
        }
        const result = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        setRandomNumber(result);
    };

    return (
        <div>
            {/* Fix: Replaced invalid 'sm' property with a responsive CSS grid layout. */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                <div>
                    <label htmlFor="min-range" className="cyber-label">
                        Minimum Value
                    </label>
                    <input
                        type="number"
                        id="min-range"
                        value={min}
                        onChange={(e) => setMin(parseInt(e.target.value, 10))}
                        className="cyber-input"
                    />
                </div>
                <div>
                    <label htmlFor="max-range" className="cyber-label">
                        Maximum Value
                    </label>
                    <input
                        type="number"
                        id="max-range"
                        value={max}
                        onChange={(e) => setMax(parseInt(e.target.value, 10))}
                        className="cyber-input"
                    />
                </div>
            </div>
            <div style={{marginTop: '1.5rem'}}>
                <Button onClick={generateRandomNumber}>Generate Number</Button>
            </div>
            
            {randomNumber !== null && (
                <ResultBox title="Your Random Number">
                    {randomNumber}
                </ResultBox>
            )}
        </div>
    );
};

export default RandomNumberGenerator;