"use client"
import { useEffect, useState } from "react";
import { usePorcupine } from "@picovoice/porcupine-react";

export default function Test() {
  const [keyword, setKeyword] = useState(null);

  const { keywordDetection, isLoaded, isListening, error, init, start, stop } =
    usePorcupine();

  // Auto-init Porcupine when page loads
  useEffect(() => {
    const initializePorcupine = async () => {
      try {
        if (!isLoaded) {
          await init(
           'uA6YVSucG1Gz2v7BgAaHJWGazfBBTNxo9V6eY5L4jrJWbq3MQbC4Fg==',
            { publicPath: "/hey-Vanya.ppn", label: "Hey Vanya" },
            { publicPath: "/porcupine_params.pv" }
          );
        }
        await start();
      } catch (err) {
        console.error("Porcupine init/start error:", err);
      }
    };

    initializePorcupine();

    // Optionally stop and release on unmount
    return () => {
      stop();
    };
  }, []);

  // Handle detection and speak
  useEffect(() => {
    if (keywordDetection !== null) {
      setKeyword(keywordDetection.label);

      // Say "Hey" using browser TTS
      const utterance = new SpeechSynthesisUtterance("HEY rAJAN");
    //   utterance.lang = "hi-IN";
    //   const voices = window.speechSynthesis.getVoices();
    //   const hindiVoice = voices.find(voice => voice.lang === "hi-IN");
    //   if (hindiVoice) utterance.voice = hindiVoice;
      speechSynthesis.speak(utterance);

      // Clear keyword after delay
      setTimeout(() => setKeyword(null), 3000);
    }
  }, [keywordDetection]);

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  return (
    <main>
      <button onClick={start} disabled={error !== null || isListening}>
        {isListening ? `Listening for "Hey Vanya"` : "Start"}
      </button>
      <button onClick={stop} disabled={error !== null || !isListening}>
        Stop
      </button>
      <div>{keyword ? `"${keyword}" detected!` : ""}</div>
    </main>
  );
}

