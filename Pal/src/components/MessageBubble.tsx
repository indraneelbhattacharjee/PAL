import React from 'react';
import { Message } from '../types';
import { usePalAI } from '../context/PalAIContext';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { state } = usePalAI();
  const { currentMode, isSpeaking } = state;
  const isAI = message.sender === 'ai';
  
  // Get mode class for AI messages
  const getModeClass = () => {
    if (!isAI) return '';
    
    switch (currentMode) {
      case 'task':
        return 'border-l-4 border-blue-500';
      case 'food':
        return 'border-l-4 border-orange-500';
      case 'chat':
        return 'border-l-4 border-purple-500';
      case 'call':
        return 'border-l-4 border-green-500';
      default:
        return '';
    }
  };
  
  // Format timestamp
  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  
  return (
    <div
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-lg ${
          isAI
            ? `bg-white dark:bg-slate-800 shadow-md ${getModeClass()}`
            : 'bg-purple-500 text-white'
        }`}
      >
        <div className="flex justify-between items-start mb-1">
          <span className="font-medium text-sm">
            {isAI ? 'Pal AI' : state.userPreferences.name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
            {formattedTime}
          </span>
        </div>
        
        <p className={`text-sm ${isAI ? 'text-gray-800 dark:text-gray-200' : 'text-white'}`}>
          {message.content}
        </p>
        
        {isAI && isSpeaking && message.id === state.messages[state.messages.length - 1].id && (
          <div className="mt-2 flex items-center">
            <div className="waveform animate-waveform scale-75 origin-left">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="waveform-bar bg-purple-400"
                  style={{ animationDelay: `${index * 0.1}s` }}
                ></div>
              ))}
            </div>
            <span className="text-xs text-purple-500 dark:text-purple-400 ml-2">Speaking...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;