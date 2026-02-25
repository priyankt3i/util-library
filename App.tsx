import React, { useState, useEffect, useCallback } from 'react';
import { UTILITIES } from './constants';
import Sidebar from './components/Sidebar';

const LaunchAnimation: React.FC = () => (
    <div className="launch-overlay"></div>
);

type ThemeMode = 'dark' | 'light';
const THEME_STORAGE_KEY = 'utility-library-theme';

const getInitialTheme = (): ThemeMode => {
    if (typeof window === 'undefined') {
        return 'dark';
    }

    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
};

const App: React.FC = () => {
    const [activeUtility, setActiveUtility] = useState(UTILITIES[0].id);
    const [isLaunching, setIsLaunching] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);

    const activeUtilityInfo = UTILITIES.find(u => u.id === activeUtility);
    const ActiveComponent = activeUtilityInfo?.component;
    const isTextCompare = activeUtility === 'text-compare';

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }, [theme]);
    
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
            <button
                className="theme-toggle-button"
                type="button"
                onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
                {theme === 'dark' ? (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5m0 15V21m7.5-9H21m-18 0h1.5m12.803 6.303l1.06 1.06M5.637 5.637l1.06 1.06m10.606-1.06l-1.06 1.06M6.697 17.303l-1.06 1.06M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                    </svg>
                ) : (
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 1111.01 2.249a7.5 7.5 0 0010.742 12.753z" />
                    </svg>
                )}
                <span>{theme === 'dark' ? 'Light' : 'Dark'} Theme</span>
            </button>

            <Sidebar 
                activeUtility={activeUtility} 
                setActiveUtility={handleSetUtility}
                isOpen={isSidebarOpen}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapsed={() => setSidebarCollapsed(prev => !prev)}
            />

            <main className="main-content">
                <div className={`main-content-inner ${isTextCompare ? 'main-content-inner-wide' : ''}`}>
                    {activeUtilityInfo && (
                        <div className="tool-header">
                            <h1>{activeUtilityInfo.name}</h1>
                            <p>{activeUtilityInfo.description}</p>
                        </div>
                    )}
                    <div className={`tool-panel ${isTextCompare ? 'tool-panel-compare' : ''}`}>
                        <div className="corner-bottom-left" />
                        <div className="corner-bottom-right" />
                        
                        {isLaunching && <LaunchAnimation />}
                        
                        {!isLaunching && ActiveComponent ? <ActiveComponent /> : null}
                    </div>
                </div>
                 <footer className="app-footer">
                    Made by <a href="https://github.com/priyankt3i" target="_blank" rel="noopener noreferrer">priyankt3i</a>
                </footer>
            </main>
        </div>
    );
};

export default App;
