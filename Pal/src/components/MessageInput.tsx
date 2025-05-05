import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { usePalAI } from '../context/PalAIContext';
import VoiceButton from './VoiceButton';

const MessageInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage, state } = usePalAI();
  const { isProcessing } = state;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      sendMessage(input);
      setInput('');
    }
  };
  
  return (
    <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 rounded-b-lg">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <VoiceButton />
        
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="input-field flex-1"
          disabled={isProcessing}
        />
        
        <button
          type="submit"
          className="p-3 rounded-full bg-purple-500 text-white disabled:opacity-50"
          disabled={!input.trim() || isProcessing}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;