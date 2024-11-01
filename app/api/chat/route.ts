import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  console.log({ messages });

  const modifiedMessages: Message[] = [
    {
      role: messages[messages.length - 1].role,
      content:
        "That feeling when " +
        messages[messages.length - 1].content +
        `. What three feelings is this person feeling? Answer this in three feeling words. Use only 3 words. The format of the feeling should fit in the sentence "I feel..." Do not include the "I feel..." part. For example, "I feel happy" would be "happy".`,
    },
  ];

  console.log({ modifiedMessages });

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    stream: true,
    messages: modifiedMessages,
  });
  console.log({ response });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
