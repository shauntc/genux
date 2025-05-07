import type { ServerLoadEvent } from "@sveltejs/kit"

export async function load({ params }: ServerLoadEvent) {
    const { articleId, market } = params
    return {
        articleId,
        market
    }
}