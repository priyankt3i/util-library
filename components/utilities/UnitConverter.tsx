import React, { useState, useMemo } from 'react';

const CONVERSIONS = {
    length: {
        name: "Length",
        units: {
            m: { name: 'Meters', toBase: (val: number) => val },
            km: { name: 'Kilometers', toBase: (val: number) => val * 1000 },
            cm: { name: 'Centimeters', toBase: (val: number) => val / 100 },
            ft: { name: 'Feet', toBase: (val: number) => val * 0.3048 },
            in: { name: 'Inches', toBase: (val: number) => val * 0.0254 },
        },
        baseUnit: 'm'
    },
    mass: {
        name: "Mass",
        units: {
            kg: { name: 'Kilograms', toBase: (val: number) => val },
            g: { name: 'Grams', toBase: (val: number) => val / 1000 },
            lb: { name: 'Pounds', toBase: (val: number) => val * 0.453592 },
            oz: { name: 'Ounces', toBase: (val: number) => val * 0.0283495 },
        },
        baseUnit: 'kg'
    }
};

type ConversionType = keyof typeof CONVERSIONS;

const UnitConverter: React.FC = () => {
    const [type, setType] = useState<ConversionType>('length');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setToUnit] = useState('ft');
    const [value, setValue] = useState(1);

    const conversionData = CONVERSIONS[type];

    const result = useMemo(() => {
        if (isNaN(value)) return 'Invalid Input';
        
        const units = conversionData.units as Record<string, { toBase: (val: number) => number }>;
        const from = units[fromUnit];
        
        const valueInBase = from.toBase(value);
        
        let fromBase: (val:number) => number = (v) => v; 
        for(const unitKey in conversionData.units) {
             if(unitKey === toUnit) {
                 const baseVal = units[unitKey].toBase(1);
                 fromBase = (v) => v / baseVal;
                 break;
             }
        }
        
        const convertedValue = fromBase(valueInBase);
        return parseFloat(convertedValue.toFixed(5));

    }, [value, fromUnit, toUnit, type, conversionData]);

    const handleTypeChange = (newType: ConversionType) => {
        setType(newType);
        const newUnits = Object.keys(CONVERSIONS[newType].units);
        setFromUnit(newUnits[0]);
        setToUnit(newUnits[1] || newUnits[0]);
    };

    const UnitSelect: React.FC<{ value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({value, onChange}) => (
        <select value={value} onChange={onChange} className="cyber-select">
            {Object.entries(conversionData.units).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
            ))}
        </select>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{display: 'flex', gap: '0.5rem', padding: '0.25rem', background: 'rgba(0,0,0,0.3)', borderRadius: '4px'}}>
                {(Object.keys(CONVERSIONS) as ConversionType[]).map(convType => (
                    <button 
                        key={convType} 
                        onClick={() => handleTypeChange(convType)} 
                        className="cyber-button"
                        style={{
                            width: '100%', 
                            border: 'none', 
                            padding: '0.5rem', 
                            background: type === convType ? 'var(--neon-green)' : 'transparent', 
                            color: type === convType ? 'var(--background-dark)' : 'var(--text-primary)',
                            boxShadow: 'none'
                        }}
                    >
                        {CONVERSIONS[convType].name}
                    </button>
                ))}
            </div>
            {/* Fix: Removed invalid 'md' property from inline style. */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                     <input type="number" value={value} onChange={e => setValue(parseFloat(e.target.value))} className="cyber-input" />
                     <UnitSelect value={fromUnit} onChange={e => setFromUnit(e.target.value)} />
                </div>
                <div style={{textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)', fontSize: '1.5rem'}}>=</div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <input type="text" value={result} readOnly className="cyber-input" style={{color: 'var(--neon-green)'}} />
                    <UnitSelect value={toUnit} onChange={e => setToUnit(e.target.value)} />
                </div>
            </div>
        </div>
    );
};

export default UnitConverter;