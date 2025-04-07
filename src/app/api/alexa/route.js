import { reqGroqAI } from '@/utils/alexa';
import { NextResponse } from 'next/server';
import { getAllAudioUrls } from 'google-tts-api'; // ✅ named import

export async function POST(req) {
  try {
    const data = await req.json();
    const message = data?.message || "नमस्ते";

    const chatCompletion = await reqGroqAI(message);
    const reply = chatCompletion.choices[0]?.message?.content || "";

    // ✅ Generate audio URL
    const audioUrl = getAllAudioUrls(reply, {
      lang: 'hi',
      slow: false,
      host: 'https://translate.google.com',
    });

    return NextResponse.json({
      text: reply,
      audioUrl,
    });
  } catch (error) {
    console.error("TTS POST error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(){
  const audioUrl = getAllAudioUrls(`
   Mujhe sunayi nahi diya. Fir se boliye?

    `, {
    lang: 'hi',
    slow: false,
    host: 'https://translate.google.com',
  });

  return NextResponse.json({
    audioUrl
  })

}