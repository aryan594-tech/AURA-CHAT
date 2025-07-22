
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { Message, MessageAuthor } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const chatSessions: { [contactId: string]: Chat } = {};

function getChatSession(contactId: string, history: Message[]): Chat {
  if (!chatSessions[contactId]) {
    // Recreate history for Gemini from stored messages
    const geminiHistory = history.map(msg => ({
        role: msg.author === MessageAuthor.USER ? 'user' : 'model',
        parts: [{ text: msg.content }]
    })).filter(msg => msg.parts[0].text); // Ensure no empty messages are sent

    chatSessions[contactId] = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: geminiHistory,
      config: {
        systemInstruction: 'You are a friendly and helpful contact in a chat application. Keep your responses concise and conversational, like a real person texting.',
      },
    });
  }
  return chatSessions[contactId];
}

export const getGeminiReply = async (contactId: string, message: string, history: Message[]): Promise<string> => {
  try {
    const chat = getChatSession(contactId, history);
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error getting reply from Gemini:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};

export const getMagicReplyAndSummary = async (history: Message[], username: string): Promise<{summary: string; suggestions: string[]}> => {
    if (history.length === 0) {
        return { summary: "No conversation yet.", suggestions: ["Hello!", "How are you?", "What's up?"] };
    }

    // Take the last 10 messages to keep the context relevant and concise
    const recentHistory = history.slice(-10);
    const conversation = recentHistory.map(m => `${m.author === MessageAuthor.USER ? username : 'Contact'}: ${m.content}`).join('\n');
    
    const prompt = `Based on the following conversation, provide a one-sentence summary and 3 distinct, short reply suggestions for '${username}'.
Conversation:
---
${conversation}
---
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        summary: {
                            type: Type.STRING,
                            description: 'A one-sentence summary of the conversation.'
                        },
                        suggestions: {
                            type: Type.ARRAY,
                            description: 'Three distinct and short reply suggestions.',
                            items: {
                                type: Type.STRING
                            }
                        }
                    },
                    required: ['summary', 'suggestions']
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error getting magic reply from Gemini:", error);
        return { summary: "Could not generate summary.", suggestions: [] };
    }
}