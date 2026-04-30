import React from 'react';
import './JournalTabs.css';

type TabType = 'connect' | 'create' | 'cultivate' | 'compete' | 'celebrate' | 'ilp';

interface JournalTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const JournalTabs: React.FC<JournalTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'connect'   as TabType, label: 'Connect',      icon: '🤝', color: '#ea580c' },
    { id: 'create'    as TabType, label: 'Create',        icon: '🎨', color: '#06b6d4' },
    { id: 'cultivate' as TabType, label: 'Cultivate',     icon: '🌱', color: '#059669' },
    { id: 'compete'   as TabType, label: 'Compete',       icon: '🏆', color: '#a855f7' },
    { id: 'celebrate' as TabType, label: 'Celebrate',     icon: '🎉', color: '#dc2626' },
    { id: 'ilp'       as TabType, label: 'Learning Plan', icon: '◈',     color: '#d4a853' },
  ];
  return (
    <div className="journal-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`journal-tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          style={{ '--tab-color': tab.color } as React.CSSProperties}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default JournalTabs;
