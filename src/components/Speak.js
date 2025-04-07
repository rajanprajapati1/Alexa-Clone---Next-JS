"use client";

import { useEffect, useState, useRef } from "react";
import AnimateWave from "./AnimateWave";
import DetailBox from "./DetailBox";
import AlexApi from "@/utils/AlexaApi";
import { usePorcupine } from "@picovoice/porcupine-react";

export default function MobileAudioWaveform() {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState("Hello, how can I assist you?");
  const [keyword, setKeyword] = useState(null);
  const [hasWelcomed, setHasWelcomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  const {
    keywordDetection,
    isLoaded,
    isListening,
    error,
    init,
    start,
    stop,
  } = usePorcupine();

  // Initialize Porcupine
  useEffect(() => {
    const initializePorcupine = async () => {
      try {
        await init(
          "uA6YVSucG1Gz2v7BgAaHJWGazfBBTNxo9V6eY5L4jrJWbq3MQbC4Fg==",
          { publicPath: "/hey-Vanya.ppn", label: "Hey Vanya" },
          { publicPath: "/porcupine_params.pv" }
        );
        await start();
      } catch (err) {
        console.error("Porcupine init error:", err);
      }
    };

    initializePorcupine();
    return () => stop();
  }, [init, start, stop]);

  // When keyword is detected
  useEffect(() => {
    if (keywordDetection !== null) {
      setKeyword(keywordDetection.label);

      if (!hasWelcomed) {
        const welcomeAudio = new Audio("/welcome.mp3");
        welcomeAudio.play().catch(err => console.error("Audio play error:", err));
        setHasWelcomed(true);
      }

      handleSpeechToText(); // start STT after hotword

      setTimeout(() => setKeyword(null), 3000);
    }
  }, [keywordDetection, hasWelcomed]);

  useEffect(() => {
    if (error) {
      console.error("Porcupine error:", error);
      alert(error.toString());
    }
  }, [error]);

  // Initialize SpeechRecognition on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "hi-IN";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.continuous = false;

        recognition.onstart = () => {
          console.log("🎤 Listening...");
          setIsRecording(true);
        };

        recognition.onresult = async (event) => {
          if (event.results && event.results[0]) {
            const spokenText = event.results[0][0].transcript;
            console.log("User said:", spokenText);
            try {
              // Call to AlexApi and process response
              const response = await AlexApi(spokenText);
              
              if (response?.text) {
                setText(response.text);
                
                // Play audio response if available
                if (response.audioUrl && response.audioUrl.length > 0) {
                  playResponseAudio(response.audioUrl[0].url);
                }
              } else {
                setText(response || "Got a response but couldn't process it.");
              }
            } catch (err) {
              console.error("Error from AlexaApi:", err);
              setText("Sorry, I couldn't process that request.");
            } finally {
              setIsRecording(false);
            }
          }
        };

        recognition.onerror = (event) => {
          console.error("STT error:", event);
          let msg = "Kuch samajh nahi aaya.";
          if (event.error === "network") msg = "Network issue! Try again.";
          if (event.error === "not-allowed") msg = "Mic permission needed!";
          if (event.error === "aborted") msg = "Mic stopped unexpectedly.";
          if (event.error === "no-speech") msg = "No speech detected. Please try again.";
          
          const errorAudio = new Audio("/error.mp3");
          errorAudio.play().catch(err => console.error("Error audio play error:", err));
          
          setText(msg);
          setIsRecording(false);
        };

        recognition.onend = () => {
          console.log("Recognition ended");
          setIsRecording(false);
        };

        recognitionRef.current = recognition;
      }
    }
    
    // Clean up
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          console.error("Error aborting recognition:", e);
        }
      }
      
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Function to play response audio
  const playResponseAudio = (audioUrl) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Create new audio element
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    // Set audio events
    audio.onplaying = () => {
      setIsPlaying(true);
      console.log("▶️ Playing response audio");
    };
    
    audio.onended = () => {
      setIsPlaying(false);
      console.log("⏹️ Response audio ended");
      audioRef.current = null;
    };
    
    audio.onerror = (err) => {
      console.error("Audio playback error:", err);
      setIsPlaying(false);
      audioRef.current = null;
    };
    
    // Start playing
    audio.play().catch(err => {
      console.error("Error playing audio:", err);
      setIsPlaying(false);
    });
  };

  const handleSpeechToText = () => {
    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser.");
        return;
      }
      
      // If not initialized in the useEffect for some reason, initialize here
      const recognition = new SpeechRecognition();
      recognition.lang = "hi-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => {
        console.log("🎤 Listening...");
        setIsRecording(true);
      };
      
      recognition.onresult = async (event) => {
        const spokenText = event.results[0][0].transcript;
        console.log("User said:", spokenText);
        try {
          // Call API and process response
          const response = await AlexApi(spokenText);
          
          if (response?.text) {
            setText(response.text);
            
            // Play audio response if available
            if (response.audioUrl && response.audioUrl.length > 0) {
              playResponseAudio(response.audioUrl[0].url);
            }
          } else {
            setText(response || "Got a response but couldn't process it.");
          }
        } catch (err) {
          console.error("Error from AlexaApi:", err);
          setText("Sorry, I couldn't process that request.");
        } finally {
          setIsRecording(false);
        }
      };
      
      recognition.onerror = (event) => {
        console.error("STT error:", event);
        let msg = "Kuch samajh nahi aaya.";
        if (event.error === "network") msg = "Network issue! Try again.";
        if (event.error === "not-allowed") msg = "Mic permission needed!";
        if (event.error === "aborted") msg = "Mic stopped unexpectedly.";
        
        const errorAudio = new Audio("/error.mp3");
        errorAudio.play().catch(err => console.error("Error audio play error:", err));
        
        setText(msg);
        setIsRecording(false);
      };
      
      recognition.onend = () => {
        console.log("Recognition ended");
        setIsRecording(false);
      };
      
      recognitionRef.current = recognition;
    }

    try {
      // If already recognizing, stop first
      if (isRecording) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error("Error stopping recognition:", e);
        }
      }
      
      // If audio is playing, stop it
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
        setIsPlaying(false);
      }
      
      // Request microphone permission explicitly
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          recognitionRef.current.start();
        })
        .catch(err => {
          console.error("Microphone permission error:", err);
          setText("Microphone permission needed!");
        });
    } catch (err) {
      console.error("Start recognition error:", err);
      setText("Couldn't start speech recognition. Try refreshing.");
    }
  };

  // Manual trigger function
  const manualTriggerSTT = () => {
    handleSpeechToText();
  };

  return (
    <div className="mx-auto text-white p-4 sm:p-6 rounded-3xl shadow-lg h-screen flex flex-col justify-between">
      <div className="flex-grow flex flex-col justify-center items-center mb-4 sm:mb-8">
        <AnimateWave isRecording={isListening || isRecording || isPlaying} />
      </div>
      
      <div className="mt-4 mb-5 text-center text-xl">
        {keyword ? `"${keyword}" detected!` : text}
      </div>
      
      <DetailBox
        handleToggleRecording={manualTriggerSTT}
        isRecording={isListening || isRecording}
      />
    </div>
  );
}
