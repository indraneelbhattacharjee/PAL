import React, { useState } from 'react';
import { usePalAI } from '../context/PalAIContext';
import { User, Volume2, Send, Trash2 } from 'lucide-react';

const Settings: React.FC = () => {
  const { state, dispatch } = usePalAI();
  const { userPreferences } = state;
  
  const [name, setName] = useState(userPreferences.name);
  const [voiceType, setVoiceType] = useState(userPreferences.voiceType);
  const [conversationStyle, setConversationStyle] = useState(userPreferences.preferredConversationStyle);
  const [newRestaurant, setNewRestaurant] = useState('');
  
  const saveSettings = () => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: {
        name,
        voiceType,
        preferredConversationStyle: conversationStyle,
      },
    });
    
    alert('Settings saved successfully!');
  };
  
  const addRestaurant = () => {
    if (newRestaurant.trim()) {
      dispatch({
        type: 'UPDATE_PREFERENCES',
        payload: {
          favoriteRestaurants: [...userPreferences.favoriteRestaurants, newRestaurant],
        },
      });
      setNewRestaurant('');
    }
  };
  
  const removeRestaurant = (index: number) => {
    const updatedRestaurants = [...userPreferences.favoriteRestaurants];
    updatedRestaurants.splice(index, 1);
    
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: {
        favoriteRestaurants: updatedRestaurants,
      },
    });
  };
  
  const clearMessages = () => {
    if (confirm('Are you sure you want to clear all messages? This cannot be undone.')) {
      localStorage.removeItem('palAI_messages');
      window.location.reload();
    }
  };
  
  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        <section className="card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <User size={20} className="mr-2" />
            Personal Settings
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </section>
        
        <section className="card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Volume2 size={20} className="mr-2" />
            Voice & Conversation
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Voice Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['professional', 'friendly', 'soothing'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setVoiceType(type)}
                    className={`py-2 px-4 rounded-lg border ${
                      voiceType === type
                        ? 'bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900 dark:border-purple-400 dark:text-purple-200'
                        : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Conversation Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['professional', 'casual', 'deep'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setConversationStyle(style)}
                    className={`py-2 px-4 rounded-lg border ${
                      conversationStyle === style
                        ? 'bg-purple-100 border-purple-500 text-purple-800 dark:bg-purple-900 dark:border-purple-400 dark:text-purple-200'
                        : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700'
                    }`}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Send size={20} className="mr-2" />
            Favorite Restaurants
          </h2>
          
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newRestaurant}
                onChange={(e) => setNewRestaurant(e.target.value)}
                placeholder="Add a restaurant"
                className="input-field flex-1"
              />
              <button
                onClick={addRestaurant}
                className="button-primary"
                disabled={!newRestaurant.trim()}
              >
                Add
              </button>
            </div>
            
            <div className="space-y-2">
              {userPreferences.favoriteRestaurants.map((restaurant, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                  <span>{restaurant}</span>
                  <button
                    onClick={() => removeRestaurant(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
              
              {userPreferences.favoriteRestaurants.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-2">
                  No favorite restaurants added yet
                </p>
              )}
            </div>
          </div>
        </section>
        
        <section className="card p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-red-500 dark:text-red-400">
            <Trash2 size={20} className="mr-2" />
            Clear Data
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This will clear all your conversation history with Pal AI.
          </p>
          
          <button
            onClick={clearMessages}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          >
            Clear All Messages
          </button>
        </section>
        
        <div className="flex justify-end mt-6">
          <button onClick={saveSettings} className="button-primary">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;