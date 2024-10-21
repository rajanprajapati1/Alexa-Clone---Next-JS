import React from 'react'
import { Mic } from 'lucide-react'
import { Button } from "@/components/ui/button"

const DetailBox = ({
    handleToggleRecording ,
isRecording
}) => {
  return (
    <div className="space-y-4">
    <h2 className="text-lg sm:text-xl font-semibold text-center">Chat with Your
        &nbsp;{['A', 'l', 'e', 'x', 'a'].map((letter, index) => (
            <span
                key={index}
                style={{
                    color: `hsl(${(index * 12) % 360}, 100%, 50%)`,
                }}
            >
                {letter}
            </span>
        ))}&nbsp;
        Buddy!</h2>
    <p className="text-xs sm:text-sm text-center text-gray-400">
        Tap the button below and let the magic begin! Who knows, you might even discover her secret talent for telling jokes!
    </p>
    <div className="flex justify-center pb-4 sm:pb-8">
        <Button
            onClick={handleToggleRecording}
            className={`rounded-full p-6 sm:p-6 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'}`}
        >
            <Mic className="w-8 h-8 sm:w-16 sm:h-16" />
        </Button>
    </div>
</div>
  )
}

export default DetailBox;