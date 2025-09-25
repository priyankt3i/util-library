import React from 'react';

interface ResultBoxProps {
    title?: string;
    children: React.ReactNode;
}

const ResultBox: React.FC<ResultBoxProps> = ({ title, children }) => {
    return (
        <div className="cyber-result-box">
            {title && <h3>{title}</h3>}
            <div className="cyber-result-box-content">
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ResultBox;