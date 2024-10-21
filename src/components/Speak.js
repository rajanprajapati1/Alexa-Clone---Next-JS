"use client"
import { useState } from "react"
import AnimateWave from "./AnimateWave"
import DetailBox from "./DetailBox";
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis ';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AlexApi from "@/utils/AlexaApi";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

export default function MobileAudioWaveform() {
    const [isRecording, setIsRecording] = useState(false);
    const { voices, selectedVoice, setSelectedVoice, speak } = useSpeechSynthesis();
    const [text, setText] = useState("Hello, how can I assist you?");
    const {
        transcript,
        isListening,
        startListening,
        stopListening,
      } = useSpeechRecognition();
    

    const handleToggleRecording = async() => {
        const data = await AlexApi('tumhara naam kya hai');
        if(!isRecording){
            speak(data,
                () => console.log("Speech started!"), 
                () =>{
                    setIsRecording(false)
                },   
                (error) => console.error("Speech error:", error) 
      
            )
        }
        setIsRecording(!isRecording)
    }
    

    return (
        <div className="max-w-sm mx-auto mt-4 sm:mt-10 text-white p-4 sm:p-6 rounded-3xl shadow-lg min-h-[80vh] flex flex-col justify-between">
            <div className="flex-grow flex justify-center items-center mb-4 sm:mb-8">
                <AnimateWave isRecording={isRecording} />
            </div>
            <DetailBox handleToggleRecording={handleToggleRecording} isRecording={isRecording} />
        </div>
    )
}