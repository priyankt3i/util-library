import React, { useMemo } from 'react';
import { UTILITIES } from '../constants';
import { Utility, UtilityCategory } from '../types';

interface SidebarProps {
  activeUtility: string;
  setActiveUtility: (id: string) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeUtility, setActiveUtility, isOpen }) => {
  const groupedUtilities = useMemo(() => {
    return UTILITIES.reduce((acc, util) => {
      (acc[util.category] = acc[util.category] || []).push(util);
      return acc;
    }, {} as Record<UtilityCategory, Utility[]>);
  }, []);

  const categoryOrder: UtilityCategory[] = ['Calculators', 'Converters', 'Generators', 'Formatters & Validators'];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
         <img src="/logo.png" alt="Utility Library Logo" />
         <h1>Utility Library</h1>
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
