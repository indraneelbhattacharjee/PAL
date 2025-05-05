import React from 'react';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import { usePalAI } from '../context/PalAIContext';
import ModeBadge from '../components/ModeBadge';

const Chat: React.FC = () => {
  const { state } = usePalAI();
  
  return (
    <div className="py-4 h-[calc(100vh-5rem)] flex flex-col">
      <header className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-t-lg shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-semibold">Chat with Pal AI</h1>
        <ModeBadge mode={state.currentMode} />
      </header>
      
      <div className="flex-1 bg-gray-50 dark:bg-slate-900 overflow-hidden flex flex-col">
        <MessageList />
      </div>
      
      <MessageInput />
    </div>
  );
};

export default Chat;