import type { ServerLoadEvent } from "@sveltejs/kit"

export async function load({ params }: ServerLoadEvent) {
    return {
        market: params.market
    }
}