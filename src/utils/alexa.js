import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: "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",
});

export const reqGroqAI = async (content,language = 'hi') => {
  const systemMessage = 
  "hindi main reposne generate karo no english jo aache se samjh aa jaye" ;

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
