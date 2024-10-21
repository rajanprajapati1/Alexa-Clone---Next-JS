import { useEffect, useState } from 'react';

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices; 
  }, []);

  const speak = (text, onStartCallback, onEndCallback, onErrorCallback) => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;   
    utterance.pitch = 1;    
    utterance.volume = 0.5;  

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      console.log("Speech started");
      if (onStartCallback) onStartCallback(); 
    };

    utterance.onend = () => {
      console.log("Speech ended");
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      console.log("Speech error");
      if (onErrorCallback) onErrorCallback();
    };

    window.speechSynthesis.speak(utterance);
  };

  return {
    voices,
    selectedVoice,
    setSelectedVoice,
    speak,
  };
};

export default useSpeechSynthesis;
