import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, Settings } from 'lucide-react';
import { usePalAI } from '../context/PalAIContext';

const Navigation: React.FC = () => {
  const { state } = usePalAI();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-lg rounded-t-xl border-t border-gray-200 dark:border-slate-700 z-10">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="flex items-center justify-around py-3">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`
            }
            end
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          
          <NavLink 
            to="/chat" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`
            }
          >
            <div className="relative">
              <MessageSquare size={24} />
              {state.messages.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full"></span>
              )}
            </div>
            <span className="text-xs mt-1">Chat</span>
          </NavLink>
          
          <NavLink 
            to="/settings" 
            className={({ isActive }) => 
              `flex flex-col items-center p-2 ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-600 dark:text-gray-400'}`
            }
          >
            <Settings size={24} />
            <span className="text-xs mt-1">Settings</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;