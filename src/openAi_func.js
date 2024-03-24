import OpenAI from "openai";
 const openAi = import.meta.env.VITE_SECRET_KEY;

const openai = new OpenAI({
  apiKey:openAi,
  dangerouslyAllowBrowser: true,
});
const messages = [];
export const openApi = async (input) => {
  const inputObj = {
    role: "user",
    content: input,
  };
  messages.push(inputObj);
  const chatCompletion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });
  console.log(chatCompletion?.choices[0]?.message?.content);
  return chatCompletion?.choices[0]?.message?.content
};

// return chatCompletion?.choices[0]?.message?.content;
