import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generateResponse(
  input: string,
  context: { mood?: string; mode?: string; history?: string[] }
) {
  try {
    const prompt = `
      Context:
      - Current mood: ${context.mood || 'neutral'}
      - Current mode: ${context.mode || 'chat'}
      - Recent conversation: ${context.history?.join('\n') || 'None'}
      
      User input: ${input}
      
      Respond as a friendly AI companion, maintaining emotional awareness and context.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return 'I apologize, but I\'m having trouble processing that right now. Could you try again?';
  }
}