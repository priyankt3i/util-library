import React, { useState, useMemo } from 'react';
import ResultBox from '../common/ResultBox';
import Button from '../common/Button';

const AgeCalculator: React.FC = () => {
    const [birthDate, setBirthDate] = useState('');
    const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d.toISOString().split('T')[0];
    }, []);

    const calculateAge = () => {
        if (!birthDate) return;

        const start = new Date(birthDate);
        const end = new Date();

        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            months -= 1;
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        setAge({ years, months, days });
    };

    return (
        <div>
            <div className="input-grid">
                <div>
                    <label htmlFor="birthDate" className="cyber-label">
                        Your Date of Birth
                    </label>
                    <input
                        type="date"
                        id="birthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        max={today}
                        className="cyber-input"
                    />
                </div>
                <div>
                    <Button onClick={calculateAge} disabled={!birthDate}>Calculate Age</Button>
                </div>
            </div>

            {age && (
                <ResultBox title="Calculated Age">
                    <div>
                        <span className="text-white">{age.years}</span> years, <span className="text-white">{age.months}</span> months, <span className="text-white">{age.days}</span> days
                    </div>
                </ResultBox>
            )}
        </div>
    );
};

export default AgeCalculator;