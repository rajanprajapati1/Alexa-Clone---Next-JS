import { useState, useEffect, useCallback } from 'react';

/**
 * A custom React hook for speech recognition in Next.js applications
 * @param {Object} options - Configuration options
 * @param {string} options.language - Recognition language (default: 'en-US')
 * @param {boolean} options.continuous - Whether recognition should continue after results (default: false)
 * @param {boolean} options.interimResults - Whether to return interim results (default: true)
 * @param {number} options.maxRetries - Maximum number of retries on network error (default: 3)
 * @returns {Object} Speech recognition state and control functions
 */
const useSpeechRecognition = ({
  language = 'en-US',
  continuous = false,
  interimResults = true,
  maxRetries = 3
} = {}) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  // Initialize speech recognition on client side only
  useEffect(() => {
    // Skip if not in browser environment
    if (typeof window === 'undefined') return;

    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    // Create and configure recognition instance
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.lang = language;
    recognitionInstance.continuous = continuous;
    recognitionInstance.interimResults = interimResults;
    
    recognitionInstance.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setText(transcript);
      // Reset retry count on successful result
      setRetryCount(0);
    };

    recognitionInstance.onerror = (event) => {
      // Handle network errors with auto-retry
      if (event.error === 'network' && retryCount < maxRetries) {
        setError(`Network error. Retrying... (${retryCount + 1}/${maxRetries})`);
        setRetryCount(prev => prev + 1);
        
        // Wait a moment before retrying
        setTimeout(() => {
          try {
            recognitionInstance.start();
          } catch (e) {
            // Ignore errors during retry attempts
          }
        }, 1000);
      } else {
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
      }
    };

    recognitionInstance.onend = () => {
      // Only set listening to false if not in continuous mode
      // and if we're not trying to retry
      if (!continuous && retryCount === 0) {
        setIsListening(false);
      }
    };

    setRecognition(recognitionInstance);

    // Cleanup on unmount
    return () => {
      if (recognitionInstance) {
        try {
          recognitionInstance.stop();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, [language, continuous, interimResults, retryCount, maxRetries]);

  // Start listening
  const startListening = useCallback(() => {
    if (!recognition) return;
    
    setText('');
    setError(null);
    setRetryCount(0);
    
    try {
      recognition.start();
      setIsListening(true);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('Permission to use microphone was denied. Please allow microphone access.');
      } else {
        setError(`Failed to start speech recognition: ${err.message}`);
      }
    }
  }, [recognition]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (!recognition) return;
    
    try {
      recognition.stop();
      setIsListening(false);
      setRetryCount(0);
    } catch (err) {
      setError(`Failed to stop speech recognition: ${err.message}`);
    }
  }, [recognition]);

  // Reset recognized text
  const resetText = useCallback(() => {
    setText('');
  }, []);

  return {
    text,
    isListening,
    startListening,
    stopListening,
    resetText,
    error,
    supported: !!recognition
  };
};

export default useSpeechRecognition;