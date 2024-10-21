import { reqGroqAI } from '@/utils/alexa';
import {NextResponse} from 'next/server'


export async function POST(req,res) {
    try {
        const data = await req.json();
        const chatCompletion = await reqGroqAI(data?.message || 'Hey');
        return NextResponse.json({
          content: chatCompletion.choices[0]?.message?.content || "",
        });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" });
      }
}
