"use client"

import { useEffect } from 'react';
import { Porcupine } from '@picovoice/porcupine-web';
import { WebVoiceProcessor } from '@picovoice/web-voice-processor';

export default function useHotwordDetection(onHotword) {
  useEffect(() => {
    let porcupine = null;
    let webVp = null;

    const init = async () => {
      try {
        const accessKey = 'E0S1s9RSxYA7EnZeGy5W+jVacJSM2QrhSb/gyHQjEBw2MGGsuyRwZA==';

        // Log version info for debugging
        console.log('Porcupine version:', Porcupine.version);
        console.log('Built-in keywords:', Porcupine.BUILT_IN_KEYWORDS);

        // Create Porcupine instance
        porcupine = await Porcupine.create({
          accessKey,
          keywords: ['Porcupine'], // Built-in keyword, explicitly defined
        });
        console.log('Porcupine initialized:', porcupine);

        // Detection callback
        const detectionCallback = (keywordIndex) => {
          console.log(`Wake word detected at index ${keywordIndex} ("Porcupine")`);
          onHotword?.();
        };

        // Initialize WebVoiceProcessor
        webVp = await WebVoiceProcessor.init({
          engines: [
            {
              engine: porcupine,
              callback: detectionCallback,
            },
          ],
          start: true, // Start immediately after initialization
        });
        console.log('🎧 WebVoiceProcessor started, listening for "Porcupine"...');
      } catch (err) {
        console.error('Failed to initialize hotword detection:', err);
      }
    };

    if (onHotword) {
      init();
    }

    // Cleanup
    return () => {
      if (webVp) {
        webVp.release(); // Updated for 4.x
        console.log('WebVoiceProcessor released');
      }
      if (porcupine) {
        porcupine.release();
        console.log('Porcupine released');
      }
    };
  }, [onHotword]);

  return null;
}