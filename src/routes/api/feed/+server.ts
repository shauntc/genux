import type { AIRequest } from '$lib/server/ai-request';
import { complete } from '$lib/server/gemini';
import { getOneService } from '$lib/server/oneservice';
import type { ServerLoadEvent } from '@sveltejs/kit';
import { CompletionClient } from '$lib/server/ai-client';
const client = new CompletionClient(complete)


const makeRequest = (data: string): AIRequest => {
    return {
        output: "html",
        instructions: "Create a personalized html and css layout for this users feed. Use the types of articles in the feed to infer what the style of feed should be",
        requirements: [
            "render all items in the layout",
            "the page is responsive to size change",
            "images are sized correctly",
            "output only the feed layout, no html boilerplate",
            "make the styling responsive to theme using the prefers-color-scheme media query",
            "make bold theme choices, it should clearly reflect the user's preferences"
        ],
        prohibitions: [
            "do not use any javascript",
            "do not change the text of the titles or summaries"
        ],
        data: [data],
        finalNotes: [
            "ONLY OUTPUT THE HTML CONTENT, NO CONTEXT SHOULD BE PROVIDED",
            "your response should start with the opening html tag and end with the closing html tag"
        ],
        reference: [
            ["Gen Z Style", `Fashion and Aesthetic Style
Gen Z's fashion is often characterized by:

Casual and Eclectic Mixes: Think streetwear, athleisure, and vintage-inspired pieces. They blend high-end brands with thrifted finds, prioritizing comfort and self-expression over traditional formality.
Sustainability and Ethics: Many favor eco-friendly materials, upcycled clothing, and brands that align with social causes, like gender inclusivity and environmental activism.
Digital Influence: Social media platforms like TikTok and Instagram shape trends, with bold colors, memes-inspired graphics, and gender-fluid styles. For example, you might see oversized hoodies paired with statement accessories or tech-integrated wearables.
Communication and Lifestyle Style
Digital-First Approach: Gen Z communicates through quick, visual formats like emojis, memes, and short videos. They're masters of irony, sarcasm, and authenticity, often using apps for everything from socializing to activism.
Values-Driven: This generation emphasizes mental health, diversity, and social justice. Their style of living includes advocating for change online, supporting underrepresented voices, and seeking work-life balance.
Tech-Savvy and Adaptive: As digital natives, they integrate technology seamlessly into daily life, influencing trends in apps, gaming, and remote work.`]
        ]
    }
}

export async function GET({ request }: ServerLoadEvent) {
    const market = new URL(request.url).searchParams.get("market")
    if (market == null) {
        return new Response("market query parameter is required", { status: 400 })
    }

    const response = await getOneService(market)
    var text = JSON.stringify(response.slice(0, 15).filter(c => c.type == "article"))
    return new Response(await client.complete(makeRequest(text)))
}


