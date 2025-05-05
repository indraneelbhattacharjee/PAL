import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageSquare, Phone, Book } from 'lucide-react';
import VoiceButton from '../components/VoiceButton';
import { usePalAI } from '../context/PalAIContext';
import ModeBadge from '../components/ModeBadge';

const Home: React.FC = () => {
  const { state, callUser } = usePalAI();
  const { userPreferences, currentMode } = state;
  const navigate = useNavigate();
  
  // Get the most recent AI message for display
  const latestAIMessage = [...state.messages]
    .reverse()
    .find(message => message.sender === 'ai');

  return (
    <div className="py-8">
      <header className="mb-8 text-center">
        <div className="flex justify-center mb-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Bot size={32} className="text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold gradient-text">Pal AI</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Your AI Voice Concierge & Emotional Companion</p>
      </header>
      
      <section className="card mb-8 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Welcome back, {userPreferences.name}</h2>
          <ModeBadge mode={currentMode} />
        </div>
        
        {latestAIMessage && (
          <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg mb-4">
            <p className="text-gray-800 dark:text-gray-200">{latestAIMessage.content}</p>
          </div>
        )}
        
        <div className="flex justify-center my-8">
          <VoiceButton large />
        </div>
        
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Tap the mic to start talking with Pal AI
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/chat')}
          className="card flex items-center p-6 hover:shadow-lg transition-shadow"
        >
          <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mr-4">
            <MessageSquare className="text-purple-600 dark:text-purple-300" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Continue Chat</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {state.messages.length > 0
                ? `${state.messages.length} messages in conversation`
                : 'Start a new conversation'}
            </p>
          </div>
        </button>
        
        <button 
          onClick={callUser}
          className="card flex items-center p-6 hover:shadow-lg transition-shadow"
        >
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
            <Phone className="text-green-600 dark:text-green-300" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Call Me</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Have Pal AI call you for a conversation
            </p>
          </div>
        </button>
        
        <button 
          onClick={() => navigate('/chat')}
          className="card flex items-center p-6 hover:shadow-lg transition-shadow col-span-1 md:col-span-2"
        >
          <div className="rounded-full bg-orange-100 dark:bg-orange-900 p-3 mr-4">
            <Book className="text-orange-600 dark:text-orange-300" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">Restaurant Recommendations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Find and book a restaurant based on your mood
            </p>
          </div>
        </button>
      </section>
    </div>
  );
};

export default Home;