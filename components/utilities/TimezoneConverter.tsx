import React, { useState, useEffect } from 'react';

const timezones = {
  'UTC': 'Etc/UTC',
  'New York (EST)': 'America/New_York',
  'London (GMT)': 'Europe/London',
  'Paris (CET)': 'Europe/Paris',
  'Tokyo (JST)': 'Asia/Tokyo',
  'Sydney (AEST)': 'Australia/Sydney',
  'Los Angeles (PST)': 'America/Los_Angeles',
  'Chicago (CST)': 'America/Chicago',
  'Moscow (MSK)': 'Europe/Moscow',
  'Dubai (GST)': 'Asia/Dubai',
  'Shanghai (CST)': 'Asia/Shanghai',
};

type TimezoneKey = keyof typeof timezones;

const TimezoneConverter: React.FC = () => {
    const [fromTz, setFromTz] = useState<TimezoneKey>('New York (EST)');
    const [toTz, setToTz] = useState<TimezoneKey>('Tokyo (JST)');
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date, tzKey: TimezoneKey) => {
        const tz = timezones[tzKey];
        try {
            return new Intl.DateTimeFormat('en-US', {
                timeZone: tz,
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }).format(date);
        } catch (e) {
            return "Invalid Timezone";
        }
    };
    
    const TimezoneSelect: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({value, onChange}) => (
        <select value={value} onChange={onChange} className="cyber-select">
            {(Object.keys(timezones) as TimezoneKey[]).map(key => (
                <option key={key} value={key}>{key}</option>
            ))}
        </select>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Fix: Removed invalid 'md' property from inline style. */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', alignItems: 'center'}}>
                 <div style={{width: '100%'}}>
                     <label className="cyber-label">From</label>
                     <TimezoneSelect value={fromTz} onChange={e => setFromTz(e.target.value as TimezoneKey)} />
                 </div>
                 {/* Fix: Removed invalid 'md' property from inline style. */}
                 <div style={{textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', display: 'none'}}>&rarr;</div>
                 <div style={{width: '100%'}}>
                     <label className="cyber-label">To</label>
                     <TimezoneSelect value={toTz} onChange={e => setToTz(e.target.value as TimezoneKey)} />
                 </div>
            </div>
            {/* Fix: Replaced invalid 'md' property with a responsive CSS grid layout. */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                 <div style={{background: 'rgba(0,0,0,0.3)', padding: '1.5rem', border: '1px solid var(--border-color)'}}>
                    <div style={{fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)'}}>{fromTz}</div>
                    <div style={{fontSize: '1.75rem', color: 'var(--neon-green)', marginTop: '0.5rem'}}>{formatTime(time, fromTz)}</div>
                 </div>
                 <div style={{background: 'rgba(0,0,0,0.3)', padding: '1.5rem', border: '1px solid var(--border-color)'}}>
                    <div style={{fontSize: '1.1rem', fontWeight: '500', color: 'var(--text-primary)'}}>{toTz}</div>
                    <div style={{fontSize: '1.75rem', color: 'var(--neon-green)', marginTop: '0.5rem'}}>{formatTime(time, toTz)}</div>
                 </div>
            </div>
        </div>
    );
};

export default TimezoneConverter;