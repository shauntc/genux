import { redirect } from '@sveltejs/kit';

export async function load() {
    redirect(308, "/en-ca/feed")
}
