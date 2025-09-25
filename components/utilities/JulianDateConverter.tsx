import React, { useState } from 'react';
import ResultBox from '../common/ResultBox';
import Button from '../common/Button';

const JulianDateConverter: React.FC = () => {
    const [inputDate, setInputDate] = useState(new Date().toISOString().split('T')[0]);
    const [dayOfYear, setDayOfYear] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);

    const calculateDayAndYear = () => {
        if (!inputDate) return;

        const utcDate = new Date(inputDate + 'T00:00:00Z');
        const currentYear = utcDate.getUTCFullYear();
        
        const startOfYear = new Date(Date.UTC(currentYear, 0, 1));
        const diffInMs = utcDate.getTime() - startOfYear.getTime();
        const oneDayInMs = 1000 * 60 * 60 * 24;
        
        const dayNumber = Math.floor(diffInMs / oneDayInMs) + 1;

        setDayOfYear(dayNumber);
        setYear(currentYear);
    };

    return (
        <div>
            <div className="input-grid">
                <div>
                    <label htmlFor="julian-date-input" className="cyber-label">
                        Select Date
                    </label>
                    <input
                        type="date"
                        id="julian-date-input"
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                        className="cyber-input"
                    />
                </div>
                <div>
                    <Button onClick={calculateDayAndYear} disabled={!inputDate}>Convert</Button>
                </div>
            </div>

            {dayOfYear !== null && year !== null && (
                // Fix: Replaced invalid 'sm' property with a responsive CSS grid layout.
                <div style={{marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                    <ResultBox title="Day of Year">
                        {dayOfYear.toString().padStart(3, '0')}
                    </ResultBox>
                    <ResultBox title="Year">
                        {year}
                    </ResultBox>
                </div>
            )}
        </div>
    );
};

export default JulianDateConverter;