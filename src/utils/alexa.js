import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "",
});

export const reqGroqAI = async (content,language = 'hi') => {
  const systemMessage = 
  

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
