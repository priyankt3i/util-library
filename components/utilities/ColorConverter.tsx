import React, { useState, useEffect } from 'react';

// Basic color conversion functions
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
const rgbToHex = (r: number, g: number, b: number): string => 
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
};

const ColorConverter: React.FC = () => {
    const [color, setColor] = useState("#AFFF00");
    const [hex, setHex] = useState("#AFFF00");
    const [rgb, setRgb] = useState("rgb(175, 255, 0)");
    const [hsl, setHsl] = useState("hsl(75, 100%, 50%)");

    useEffect(() => {
        const rgbVal = hexToRgb(color);
        if (rgbVal) {
            const hslVal = rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b);
            setHex(color.toUpperCase());
            setRgb(`rgb(${rgbVal.r}, ${rgbVal.g}, ${rgbVal.b})`);
            setHsl(`hsl(${hslVal.h}, ${hslVal.s}%, ${hslVal.l}%)`);
        }
    }, [color]);

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    const ColorInput: React.FC<{label: string, value: string}> = ({label, value}) => (
         <div style={{width: '100%'}}>
            <label className="cyber-label">{label}</label>
            <input
                type="text"
                readOnly
                value={value}
                className="cyber-input"
            />
        </div>
    );

    return (
        <div className="color-converter-layout">
            <div className="color-picker-wrapper">
                 <label htmlFor="color-picker" className="cyber-label" style={{textAlign: 'center'}}>
                    Select Color
                </label>
                <input
                    id="color-picker"
                    type="color"
                    value={color}
                    onChange={handleColorChange}
                    style={{backgroundColor: color}}
                />
            </div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem'}}>
               <ColorInput label="HEX" value={hex} />
               <ColorInput label="RGB" value={rgb} />
               <ColorInput label="HSL" value={hsl} />
            </div>
        </div>
    );
};

export default ColorConverter;