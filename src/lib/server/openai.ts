import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { format, type AIRequest } from './ai-request';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

export async function complete(text: string): Promise<string> {
    console.group("openai:complete")
    console.log(`request length: ${text.length}`)
    const completion = await openai.chat.completions.create({
        model: "gpt-4.1-2025-04-14",
        messages: [{ role: "user", content: text }],
    });
    const response = completion.choices[0].message.content || '';
    console.log(`request length: ${response.length}`)

    console.groupEnd();
    return response
}
