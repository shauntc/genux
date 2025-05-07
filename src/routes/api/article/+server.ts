import { complete } from '$lib/server/gemini';
import type { ServerLoadEvent } from '@sveltejs/kit';
import * as content from '$lib/data/article.json';
import type { AIRequest } from '$lib/server/ai-request';
import { CompletionClient } from '$lib/server/ai-client';
const client = new CompletionClient(complete)
const article = JSON.stringify(content);

const articleRequest = (data: string): AIRequest => {
    return {
        output: "html",
        reference: [
            [
                "Image API",
                `Image URL Query Parameters:
w: output width
h: output height
x: focal region left
y: focal region top
s: focal region width
d: focal region height
m: processing mode (6)

Usage: Append these parameters to maintain important image content during resizing.
The focal region (x,y,s,d) defines what part of the image should remain visible.

Example:
Original: https://example.com/image.jpg
With params: https://example.com/image.jpg?w=500&h=300&x=100&y=50&s=200&d=200&m=6

This will:
- Resize to 500x300px
- Keep the 200x200px region (starting at 100,50) in frame`
            ]
        ],
        instructions: "Create an html and css layout for this article. It should be styled like a classic newspaper article.",
        requirements: [
            "the whole text of the article is included",
            "images and videos in the body are correctly resolved from the data",
            "the page is responsive to size change",
            "images are sized correctly according to the image api",
            "output only the contents of the <article>...</article> tag, leave out the html boilerplate",
        ],
        prohibitions: [
            "do not use any javascript",
            "do not change the text of the article"
        ],
        data: [data],
        finalNotes: [
            "ONLY OUTPUT THE HTML CONTENT, NO CONTEXT SHOULD BE PROVIDED",
            "your response should start with the opening <article> tag and end with the closing </article> tag"
        ]
    }
}

export async function GET({ request }: ServerLoadEvent) {
    const id = new URL(request.url).searchParams.get("id")
    if (id == null) {
        return new Response("id query parameter is required", { status: 400 })
    }

    return new Response(await client.complete(articleRequest(JSON.stringify(article))))
}
