import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { usePalAI } from '../context/PalAIContext';

const Layout: React.FC = () => {
  const { state } = usePalAI();
  const { currentMood } = state;
  
  // Dynamic background based on mood
  const getMoodBackground = () => {
    switch (currentMood) {
      case 'happy':
        return 'from-yellow-50 to-blue-50 dark:from-slate-900 dark:to-blue-900';
      case 'sad':
        return 'from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-900';
      case 'empathetic':
        return 'from-purple-50 to-pink-50 dark:from-slate-900 dark:to-purple-900';
      case 'enthusiastic':
        return 'from-orange-50 to-yellow-50 dark:from-slate-900 dark:to-orange-900';
      case 'helpful':
        return 'from-green-50 to-blue-50 dark:from-slate-900 dark:to-green-900';
      case 'thoughtful':
        return 'from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-900';
      default:
        return 'from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br transition-colors duration-1000 ${getMoodBackground()}`}>
      <div className="max-w-screen-lg mx-auto px-4 pb-20">
        <Outlet />
      </div>
      <Navigation />
    </div>
  );
};

export default Layout;