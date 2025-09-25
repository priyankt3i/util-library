import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ children, label, id, ...props }) => {
    return (
        <div>
            <label htmlFor={id} className="cyber-label">
                {label}
            </label>
            <select
                id={id}
                {...props}
                className="cyber-select"
            >
                {children}
            </select>
        </div>
    );
};

export default Select;