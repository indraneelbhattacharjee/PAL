// Message types
export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

// User preferences
export interface UserPreferences {
  name: string;
  voiceType: 'professional' | 'friendly' | 'soothing';
  favoriteRestaurants: string[];
  preferredConversationStyle: 'professional' | 'casual' | 'deep';
}

// Mood types for emotional intelligence
export type MoodType = 
  | 'neutral' 
  | 'happy' 
  | 'sad' 
  | 'empathetic' 
  | 'enthusiastic' 
  | 'helpful'
  | 'thoughtful';

// Functional modes
export type Mode = 'task' | 'food' | 'chat' | 'call';

// Restaurant data
export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  address: string;
  imageUrl: string;
}