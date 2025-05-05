import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Message, UserPreferences, MoodType, Mode } from '../types';

// Define the state type
interface PalAIState {
  messages: Message[];
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  userPreferences: UserPreferences;
  currentMode: Mode;
  currentMood: MoodType;
}

// Define action types
type PalAIAction =
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_LISTENING'; payload: boolean }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'SET_SPEAKING'; payload: boolean }
  | { type: 'SET_MODE'; payload: Mode }
  | { type: 'SET_MOOD'; payload: MoodType }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> };

// Create context
const PalAIContext = createContext<{
  state: PalAIState;
  dispatch: React.Dispatch<PalAIAction>;
  sendMessage: (content: string) => void;
  startListening: () => void;
  stopListening: () => void;
  callUser: () => void;
} | undefined>(undefined);

// Initial state
const initialState: PalAIState = {
  messages: [],
  isListening: false,
  isProcessing: false,
  isSpeaking: false,
  userPreferences: {
    name: 'User',
    voiceType: 'friendly',
    favoriteRestaurants: ['The Italian Place', 'Sushi Heaven', 'Burger Joint'],
    preferredConversationStyle: 'casual',
  },
  currentMode: 'chat',
  currentMood: 'neutral',
};

// Reducer function
function palAIReducer(state: PalAIState, action: PalAIAction): PalAIState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_LISTENING':
      return {
        ...state,
        isListening: action.payload,
      };
    case 'SET_PROCESSING':
      return {
        ...state,
        isProcessing: action.payload,
      };
    case 'SET_SPEAKING':
      return {
        ...state,
        isSpeaking: action.payload,
      };
    case 'SET_MODE':
      return {
        ...state,
        currentMode: action.payload,
      };
    case 'SET_MOOD':
      return {
        ...state,
        currentMood: action.payload,
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}

// Create provider
export function PalAIProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(palAIReducer, initialState);

  // Mock responses based on input and current mode
  const mockResponse = (input: string): { text: string; mode: Mode; mood: MoodType } => {
    const lowerInput = input.toLowerCase();
    
    // Mode detection
    if (lowerInput.includes('book') && lowerInput.includes('table')) {
      return {
        text: `I'd be happy to book a table for you. What restaurant and time were you thinking?`,
        mode: 'task',
        mood: 'helpful',
      };
    } else if (lowerInput.includes('food') || lowerInput.includes('restaurant') || lowerInput.includes('hungry')) {
      return {
        text: `Based on your preferences, I think you might enjoy ${state.userPreferences.favoriteRestaurants[Math.floor(Math.random() * state.userPreferences.favoriteRestaurants.length)]} today. Would you like me to make a reservation?`,
        mode: 'food',
        mood: 'enthusiastic',
      };
    } else if (lowerInput.includes('can we talk')) {
      return {
        text: "I'm here for you. I'd be happy to call you right now for a conversation if you'd like?",
        mode: 'call',
        mood: 'empathetic',
      };
    } else if (lowerInput.includes('sad') || lowerInput.includes('lonely') || lowerInput.includes('upset')) {
      return {
        text: "I'm sorry to hear you're feeling down. Would you like to talk about it? I'm here to listen.",
        mode: 'chat',
        mood: 'empathetic',
      };
    } else if (lowerInput.includes('happy') || lowerInput.includes('great') || lowerInput.includes('awesome')) {
      return {
        text: "That's wonderful to hear! I'm so glad things are going well for you.",
        mode: 'chat',
        mood: 'happy',
      };
    } else {
      return {
        text: "I'm always here to chat or help with anything you need. What's on your mind today?",
        mode: 'chat',
        mood: 'neutral',
      };
    }
  };

  // Handle messages
  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date(),
    };
    
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    dispatch({ type: 'SET_PROCESSING', payload: true });

    // Generate response
    setTimeout(() => {
      const response = mockResponse(content);
      dispatch({ type: 'SET_MODE', payload: response.mode });
      dispatch({ type: 'SET_MOOD', payload: response.mood });
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: response.text,
        timestamp: new Date(),
      };
      
      dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
      dispatch({ type: 'SET_PROCESSING', payload: false });
      dispatch({ type: 'SET_SPEAKING', payload: true });
      
      // Simulate speech ending
      setTimeout(() => {
        dispatch({ type: 'SET_SPEAKING', payload: false });
      }, 2000);
    }, 1000);
  };

  // Voice interaction methods
  const startListening = () => {
    dispatch({ type: 'SET_LISTENING', payload: true });
  };

  const stopListening = () => {
    dispatch({ type: 'SET_LISTENING', payload: false });
    // In a real app, we would process the audio here
    // For this demo, we'll simulate with a random message
    const mockMessages = [
      "How are you today?",
      "Can we talk?",
      "I'm feeling hungry, any recommendations?",
      "Book me a table at an Italian restaurant",
    ];
    
    const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
    sendMessage(randomMessage);
  };

  // Simulate call functionality
  const callUser = () => {
    console.log("Simulating a call to the user");
    alert("In a full implementation, Pal AI would initiate a voice call to you now.");
  };

  // Load messages from local storage
  useEffect(() => {
    const savedMessages = localStorage.getItem('palAI_messages');
    if (savedMessages) {
      const parsedMessages = JSON.parse(savedMessages) as Message[];
      parsedMessages.forEach(message => {
        dispatch({ type: 'ADD_MESSAGE', payload: message });
      });
    } else {
      // Add welcome message if no previous messages
      const welcomeMessage: Message = {
        id: 'welcome',
        sender: 'ai',
        content: "Hi there! I'm Pal AI, your personal voice concierge and emotional companion. How can I assist you today?",
        timestamp: new Date(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: welcomeMessage });
    }
  }, []);

  // Save messages to local storage
  useEffect(() => {
    if (state.messages.length > 0) {
      localStorage.setItem('palAI_messages', JSON.stringify(state.messages));
    }
  }, [state.messages]);

  return (
    <PalAIContext.Provider value={{ state, dispatch, sendMessage, startListening, stopListening, callUser }}>
      {children}
    </PalAIContext.Provider>
  );
}

// Custom hook for using the context
export function usePalAI() {
  const context = useContext(PalAIContext);
  if (context === undefined) {
    throw new Error('usePalAI must be used within a PalAIProvider');
  }
  return context;
}