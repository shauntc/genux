import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from '$env/static/private';


const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function complete(text: string): Promise<string> {
    console.group("Gemini:complete")
    console.log(`request length: ${text.length}`)
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: text,
    });
    console.log(`response length: ${response.text?.length}`)

    console.groupEnd();
    return response.text ?? ""
}

export async function* streamingComplete(prompt: string): AsyncGenerator<string> {
    const response = await ai.models.generateContentStream({
        model: "gemini-2.0-flash",
        contents: prompt,
    });

    for await (const value of response) {
        yield value.text ?? ""
    }
}

