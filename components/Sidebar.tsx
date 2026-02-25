import React, { useMemo } from 'react';
import { UTILITIES } from '../constants';
import { Utility, UtilityCategory } from '../types';

interface SidebarProps {
  activeUtility: string;
  setActiveUtility: (id: string) => void;
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapsed: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeUtility, setActiveUtility, isOpen, isCollapsed, onToggleCollapsed }) => {
  const groupedUtilities = useMemo(() => {
    return UTILITIES.reduce((acc, util) => {
      (acc[util.category] = acc[util.category] || []).push(util);
      return acc;
    }, {} as Record<UtilityCategory, Utility[]>);
  }, []);

  const categoryOrder: UtilityCategory[] = ['Calculators', 'Converters', 'Generators', 'Formatters & Validators'];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
         <img src="/logo.png" alt="Utility Library Logo" />
         <h1>Utility Library</h1>
         <button
          type="button"
          className="sidebar-collapse-button"
          onClick={onToggleCollapsed}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
         >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d={isCollapsed ? 'M13.5 4.5L21 12l-7.5 7.5M3 12h18' : 'M10.5 4.5L3 12l7.5 7.5M3 12h18'} />
          </svg>
         </button>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {categoryOrder.map(category => 
            groupedUtilities[category] && (
            <li key={category} className="sidebar-category">
              <h2 className="sidebar-category-title">{category}</h2>
              <ul>
                {groupedUtilities[category].map((util) => (
                  <li key={util.id}>
                    <button
                      onClick={() => setActiveUtility(util.id)}
                      className={`sidebar-tool-button ${activeUtility === util.id ? 'active' : ''}`}
                      title={util.name}
                    >
                      <util.icon />
                      <span>{util.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
