import type { AIRequest } from "$lib/server/ai-request"
import { streamingComplete } from "$lib/server/gemini"
import { getOneService } from "$lib/server/oneservice"
import { StreamingCompletionClient } from "$lib/server/ai-client";

const client = new StreamingCompletionClient(streamingComplete)
const aiReq = (data: string): AIRequest => {
    return {
        instructions: "Create a personalized html and tailwind-css layout for this users feed. Use the types of articles in the feed to infer what the style of feed should be. Be creative, make bold choices!",
        requirements: [
            "render all items in the layout",
            "the page is responsive to size change",
            "images are sized correctly",
            "output only the feed layout, no html boilerplate",
            "make the styling responsive to theme using the prefers-color-scheme media query",
            "make bold theme choices, it should clearly reflect the user's preferences"
        ],
        prohibitions: [
            // "do not use any javascript",
            "do not change the text of the titles or summaries"
        ],
        data: [data],
        finalNotes: [
            "ensure the output is a valid html document, each item in the feed should be wrapped in a section tag",
            "ONLY OUTPUT THE HTML CONTENT",
        ],
        output: "html"
    }
}

export async function GET({ request }) {
    const market = new URL(request.url).searchParams.get("market")
    if (market == null) {
        return new Response("market query parameter is required", { status: 400 })
    }

    const response = await getOneService(market)
    const text = JSON.stringify(response.filter(c => c.type == "article").slice(0, 15))

    const aiRes = await client.complete(aiReq(text))

    var res = new Response(aiRes)
    return res
}