import React, { useState, useEffect, useCallback } from 'react';
import { UTILITIES } from './constants';
import Sidebar from './components/Sidebar';

const LaunchAnimation: React.FC = () => (
    <div className="launch-overlay"></div>
);

const App: React.FC = () => {
    const [activeUtility, setActiveUtility] = useState(UTILITIES[0].id);
    const [isLaunching, setIsLaunching] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const activeUtilityInfo = UTILITIES.find(u => u.id === activeUtility);
    const ActiveComponent = activeUtilityInfo?.component;
    
    const handleSetUtility = useCallback((id: string) => {
        if (id === activeUtility) {
             if (window.innerWidth < 768) setSidebarOpen(false);
             return;
        };

        setIsLaunching(true);
        setSidebarOpen(false);

        setTimeout(() => {
            setActiveUtility(id);
            setIsLaunching(false);
        }, 400); // Duration of the scan-line animation
    }, [activeUtility]);

    return (
        <div className="app-container">
             <div 
                className={`app-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={() => setSidebarOpen(false)}
            />
            <button className="mobile-menu-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>

            <Sidebar 
                activeUtility={activeUtility} 
                setActiveUtility={handleSetUtility}
                isOpen={isSidebarOpen}
            />

            <main className="main-content">
                <div className="main-content-inner">
                    {activeUtilityInfo && (
                        <div className="tool-header">
                            <h1>{activeUtilityInfo.name}</h1>
                            <p>{activeUtilityInfo.description}</p>
                        </div>
                    )}
                    <div className="tool-panel">
                        <div className="corner-bottom-left" />
                        <div className="corner-bottom-right" />
                        
                        {isLaunching && <LaunchAnimation />}
                        
                        {!isLaunching && ActiveComponent ? <ActiveComponent /> : null}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;