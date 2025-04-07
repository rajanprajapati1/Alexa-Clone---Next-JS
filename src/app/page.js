import React from 'react'
import Test from './Test'
import MobileAudioWaveform from '@/components/Speak'

const page = () => {
  return <div className='w-full h-full bg-black'>
    <MobileAudioWaveform />
  </div>
}

export default page

// "use client"

// import { useState, useEffect } from 'react';
// import useSpeechRecognition from '@/hooks/useSpeechRecognition';

// function SpeechToTextDemo() {
//   const { 
//     text, 
//     isListening, 
//     startListening, 
//     stopListening,
//     resetText,
//     error,
//     supported
//   } = useSpeechRecognition({
//     // Customize options as needed
//     language: 'en-US',
//     continuous: false,
//     interimResults: true,
//     maxRetries: 3
//   });
  
//   // Check for microphone permissions on component mount
//   useEffect(() => {
//     if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
//       navigator.mediaDevices.getUserMedia({ audio: true })
//         .catch(err => {
//           console.warn('Microphone access may not be granted:', err);
//         });
//     }
//   }, []);

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Speech to Text Demo</h1>
      
//       {!supported && (
//         <div className="p-3 bg-red-100 text-red-700 rounded mb-4">
//           Your browser doesn't support speech recognition.
//         </div>
//       )}
      
//       {error && (
//         <div className="p-3 bg-yellow-100 text-yellow-700 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       <div className="flex gap-2 mb-4">
//         <button 
//           onClick={isListening ? stopListening : startListening}
//           disabled={!supported}
//           className={`px-4 py-2 rounded ${
//             isListening 
//               ? 'bg-red-500 hover:bg-red-600 text-white' 
//               : 'bg-blue-500 hover:bg-blue-600 text-white'
//           } disabled:opacity-50`}
//         >
//           {isListening ? 'Stop Listening' : 'Start Listening'}
//         </button>
        
//         <button 
//           onClick={resetText} 
//           disabled={!text}
//           className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
//         >
//           Clear Text
//         </button>
//       </div>
      
//       <div className="mb-4">
//         <h2 className="text-xl font-medium mb-2">Transcription:</h2>
//         <div className="p-4 border rounded min-h-[100px] bg-gray-50">
//           {text || <span className="text-gray-400">(Start speaking...)</span>}
//         </div>
//       </div>
      
//       {isListening && (
//         <div className="p-2 bg-green-100 text-green-700 rounded text-center">
//           Listening...
//         </div>
//       )}
//     </div>
//   );
// }

// export default SpeechToTextDemo;