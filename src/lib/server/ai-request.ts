export interface AIRequest {
    instructions: string
    reference?: [string, string][];
    examples?: [string, string][];
    requirements?: string[];
    prohibitions?: string[];
    data?: string[];
    finalNotes?: string[];
    output: "json" | "text" | "html"
}

export function format(request: AIRequest): string {
    let result = ""
    if (request.data != null && request.data.length > 0) {
        result += "# Content:"
        for (const data of request.data) {
            result += `\`\`\`json
${data}
\`\`\``
        }
        result += "\n"
    }
    if (request.reference != null && request.reference.length > 0) {
        result += "# Reference:"
        for (const [title, reference] of request.reference) {
            result += `## ${title}
${reference}
`
        }
        result += "\n"
    }

    result += `# Request:
${request.instructions}

`

    if (request.requirements != null && request.requirements.length > 0) {
        result += "# Requirements:\n"
        for (const requirement of request.requirements) {
            result += `- ${requirement}\n`
        }
        result += "\n"
    }

    if (request.prohibitions != null && request.prohibitions.length > 0) {
        result += "# Prohibitions:\n"
        for (const prohibition of request.prohibitions) {
            result += `- ${prohibition}\n`
        }
        result += "\n"
    }

    if (request.examples != null && request.examples.length > 0) {
        result += "# Examples:\n"
        for (const [title, example] of request.examples) {
            result += `## ${title}
${example}
`
        }
        result += "\n"
    }

    if (request.finalNotes != null && request.finalNotes.length > 0) {
        result += "\n"
        for (const note of request.finalNotes) {
            result += note + "\n"
        }
    }

    if (request.output) {
        result += formatHint(request)
    }

    return result;
}

function formatHint(request: AIRequest): string {
    switch (request.output) {
        case "json":
            return "\n\nONLY OUTPUT THE JSON CONTENT, NO CONTEXT SHOULD BE PROVIDED\n\n"
        case "html":
            return "\n\nONLY OUTPUT THE TEXT CONTENT, NO CONTEXT SHOULD BE PROVIDED\n\n"
        case "text":
        default:
            return ""
    }
}

export function verify(request: AIRequest, output: string): boolean {
    switch (request.output) {
        case "json":
            try {
                const _ = JSON.parse(output)
                return true
            } catch (e) {
                return false
            }
        case "html":
            const trimmed = output.trim()
            return trimmed.startsWith("<") && trimmed.endsWith(">")
        case "text":
        default:
            return true
    }
}