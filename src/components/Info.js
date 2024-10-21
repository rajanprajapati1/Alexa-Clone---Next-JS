'use client'
import React, { useState } from 'react'
import useSpeechSynthesis from '@/hooks/useSpeechSynthesis '
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Volume2, Play } from "lucide-react"

export default function Info() {
  const { voices, selectedVoice, setSelectedVoice, speak } = useSpeechSynthesis()
  const [text, setText] = useState("Hello, how can I assist you?")

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Speech Synthesis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="text-input" className="text-sm font-medium text-gray-700">
            Text to Speak
          </label>
          <Input
            id="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to speak..."
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="voice-select" className="text-sm font-medium text-gray-700">
            Select Voice
          </label>
          <Select onValueChange={(value) => setSelectedVoice(voices.find(v => v.name === value))}>
            <SelectTrigger id="voice-select" className="w-full">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice, i) => (
                <SelectItem key={i} value={voice.name}>
                  {voice.name} ({voice.lang})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedVoice && (
          <div className="text-sm text-gray-600">
            Selected Voice: <span className="font-semibold">{selectedVoice.name}</span>
          </div>
        )}

        <Button 
          onClick={() => speak(text)} 
          className="w-full"
        >
          <Play className="w-4 h-4 mr-2" />
          Speak
        </Button>
      </CardContent>
    </Card>
  )
}