import React, { useState, useEffect } from 'react';
import { Mic, Loader2 } from 'lucide-react';
import { usePalAI } from '../context/PalAIContext';

interface VoiceButtonProps {
  large?: boolean;
}

const VoiceButton: React.FC<VoiceButtonProps> = ({ large = false }) => {
  const { state, startListening, stopListening } = usePalAI();
  const { isListening, isProcessing } = state;
  const [waveformBars, setWaveformBars] = useState<number[]>([]);
  
  useEffect(() => {
    // Create random heights for waveform bars
    if (isListening) {
      const interval = setInterval(() => {
        const bars = Array.from({ length: 10 }, () => Math.floor(Math.random() * 24) + 8); // 8-32px heights
        setWaveformBars(bars);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isListening]);
  
  const handleVoiceButton = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const buttonSize = large ? 'w-20 h-20' : 'w-14 h-14 md:w-16 md:h-16';
  
  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={handleVoiceButton}
        className={`${buttonSize} rounded-full flex items-center justify-center
          bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600
          text-white shadow-lg hover:shadow-xl transition-all duration-300
          transform ${isListening ? 'scale-110 animate-pulse-soft' : 'hover:scale-105'}`}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <Loader2 className="animate-spin" size={large ? 32 : 24} />
        ) : (
          <Mic size={large ? 32 : 24} />
        )}
      </button>
      
      {isListening && (
        <div className="waveform animate-waveform mt-4">
          {waveformBars.map((height, index) => (
            <div 
              key={index} 
              className="waveform-bar" 
              style={{ 
                height: `${height}px`,
                animationDelay: `${index * 0.1}s` 
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VoiceButton;