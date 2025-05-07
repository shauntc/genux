
export async function* trimStart(generator: AsyncGenerator<string>, start: string): AsyncGenerator<string> {
    let { value, done } = await generator.next()
    let text: string = value;
    while (text.length <= start.length && !done) { // get enough to verify if the starting text matches
        const next = await generator.next()
        text += next.value
        done = next.done
    }

    if (text.startsWith(start)) {
        text = text.slice(start.length)
    }

    if (text) {
        yield text
    }
    if (!done) {
        yield* generator
    }
}

export async function* trimEnd(generator: AsyncGenerator<string>, end: string): AsyncGenerator<string> {
    while (true) {
        let { value, done } = await generator.next()
        let text: string = value;
        let mightMatch = checkMatch(text, end)

        while (mightMatch === MatchResult.PartialMatch && !done) {
            const next = await generator.next()
            text += next.value
            done = next.done
            mightMatch = checkMatch(text, end)
        }

        if (mightMatch === MatchResult.FullMatch && done) {
            text = text.slice(0, -end.length)
        }
        yield text
    }
}

enum MatchResult {
    NoMatch,
    PartialMatch,
    FullMatch
}

function checkMatch(text: string, end: string): MatchResult {
    let startIndex = text.indexOf(end[0])
    if (startIndex === -1) {
        return MatchResult.NoMatch
    }
    for (let i = 1; i < end.length; i++) {
        if (startIndex + i >= text.length) {
            return MatchResult.PartialMatch
        }
        if (text[startIndex + i] !== end[i]) {
            return MatchResult.NoMatch
        }
    }
    return MatchResult.FullMatch
}

export async function* trim(generator: AsyncGenerator<string>, start: string, end: string): AsyncGenerator<string> {
    let trimmed = trimStart(generator, start)
    let trimmedEnd = trimEnd(trimmed, end)
    yield* trimmedEnd
}