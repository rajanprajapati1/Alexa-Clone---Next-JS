import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || `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`,
});

export const reqGroqAI = async (content,language = 'hi') => {
  const systemMessage = language === 'hi'
  ? "आप एक सहायक हैं जिसका नाम एलेक्सा है। उपयोगकर्ता प्रश्नों का उत्तर मित्रवत और जानकारीपूर्ण तरीके से दें।"
  : "You are a helpful assistant named Alexa. Respond to user queries in a friendly and informative manner.";

  const res = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
  return res;
};