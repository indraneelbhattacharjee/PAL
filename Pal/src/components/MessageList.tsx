import React, { useRef, useEffect } from 'react';
import { usePalAI } from '../context/PalAIContext';
import MessageBubble from './MessageBubble';

const MessageList: React.FC = () => {
  const { state } = usePalAI();
  const { messages } = state;
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Group messages by date
  const groupedMessages = messages.reduce((acc, message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(message);
    return acc;
  }, {} as Record<string, typeof messages>);
  
  // Convert to array and sort by date
  const sortedDates = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {sortedDates.map((date) => (
        <div key={date} className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-300">
              {date === new Date().toLocaleDateString() ? 'Today' : date}
            </div>
          </div>
          
          {groupedMessages[date].map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;