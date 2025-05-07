import type { AIRequest } from "./ai-request";
import { format, verify } from "./ai-request";
import { trim } from "$lib/util/generator";
export class CompletionClient {
    constructor(private _complete: (input: string) => Promise<string>, private maxAttempts: number = 2) { }

    async complete(request: AIRequest): Promise<string> {
        let attempts = 0;

        while (attempts < this.maxAttempts) {
            attempts++
            const input = format(request)
            let output = await this._complete(input)
            output = tryFormat(request, output)
            if (verify(request, output)) {
                return output
            } else {
                request.finalNotes = [...(request.finalNotes || []), `Attempt ${attempts} failed. Please try again. make sure to format the output as ${request.output} and to follow the instructions.`]
            }
            console.log("complete:while:failed", output)
        }

        throw new Error("Failed to verify output")
    }
}

// attempts to format the output to match the request. fixing some common issues
function tryFormat(request: AIRequest, output: string): string {
    var res = output
    try {
        switch (request.output) {
            case "json":
                // fix common issues
                res = res.replace(/^```json\s*/, "").replace(/```$/, "");
                res = res.replace(/^```\s*/, "").replace(/```$/, "");
                return res
            case "html":
                res = res.replace(/^```html\s*/, "").replace(/```$/, "");
                res = res.replace(/^```\s*/, "").replace(/```$/, "");
                return res
            default:
                return res
        }
    } catch (error) {
        return res
    }
}

export class StreamingCompletionClient {
    constructor(private _complete: (input: string) => AsyncGenerator<string>, private maxAttempts: number = 2) { }

    async complete(request: AIRequest): Promise<ReadableStream<string>> {
        let prompt = format(request)
        let stream = this._complete(prompt)
        return trimmedStream(stream, ...toTrim(request))
    }

    async completeHtml(request: AIRequest, chunkTag: string): Promise<ReadableStream<string>> {
        let prompt = format(request)
        let stream = this._complete(prompt)
        return componentChunkedStream(stream, chunkTag)
    }
}
function toTrim(req: AIRequest): [string, string] {
    switch (req.output) {
        case "json":
            return ["```json", "```"]
        case "html":
            return ["```html", "```"]
        default:
            return ["", ""]
    }
}

function trimmedStream(generator: AsyncGenerator<string>, start: string, end: string): ReadableStream<string> {
    let trimmedGenerator = trim(generator, start, end)

    return new ReadableStream({
        async pull(controller) {
            let { value, done } = await trimmedGenerator.next();
            let text: string = value;

            if (text) {
                controller.enqueue(text);
            }
            if (done) {
                controller.close();
            }
        },
    });
}


function componentChunkedStream(generator: AsyncGenerator<string>, tag: string): ReadableStream<string> {
    let trimmedGenerator = trim(generator, "```html", "```")

    let tagStart = `<${tag}`


    return new ReadableStream({
        async pull(controller) {
            console.log("pull: starting new chunk");
            let { value, done } = await trimmedGenerator.next();
            let text: string = value;

            if (text) {
                controller.enqueue(text);
            }
            if (done) {
                controller.close();
            }
        },
    });
}
