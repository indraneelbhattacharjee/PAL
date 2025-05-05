import React from 'react';
import { ClipboardList, Utensils, MessageSquare, Phone } from 'lucide-react';
import { Mode } from '../types';

interface ModeBadgeProps {
  mode: Mode;
}

const ModeBadge: React.FC<ModeBadgeProps> = ({ mode }) => {
  const getIcon = () => {
    switch (mode) {
      case 'task':
        return <ClipboardList size={16} />;
      case 'food':
        return <Utensils size={16} />;
      case 'chat':
        return <MessageSquare size={16} />;
      case 'call':
        return <Phone size={16} />;
    }
  };
  
  const getLabel = () => {
    switch (mode) {
      case 'task':
        return 'Task';
      case 'food':
        return 'Food';
      case 'chat':
        return 'Chat';
      case 'call':
        return 'Call';
    }
  };
  
  return (
    <div className={`mode-pill ${mode} flex items-center gap-1`}>
      {getIcon()}
      <span>{getLabel()}</span>
    </div>
  );
};

export default ModeBadge;