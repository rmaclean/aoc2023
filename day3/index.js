const fs = require('node:fs/promises')

/**
 * read an input
 * @returns {Promise<String>}
 */
const readInputAsText = async () => {
    try {
        const data = await fs.readFile('./day3/input.txt', { encoding: 'utf8' })
        return data
    } catch (err) {
        console.error(err)
        return ""
    }
}

const isSymbol = /[^\.\d]/
const isDigit = /\d/

const main = async () => {
    const data = await readInputAsText()
    const lines = data
        .split('\n')
        .filter(line => line);

    const symbols = []
    const numbers = []

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        const chars = line.split('')
        for (let charIndex = 0; charIndex < chars.length; charIndex++) {
            const char = chars[charIndex];
            if (char.match(isSymbol)) {
                symbols.push({char, lineIndex, charIndex})
            }
        }
    }

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const line = lines[lineIndex];
        const chars = line.split('')
        let currentDigits = ''
        let charIndex = 0
        for (charIndex = 0; charIndex < chars.length; charIndex++) {
            const char = chars[charIndex];
            if (char.match(isDigit)) {
                currentDigits += char
            } else {
                if (currentDigits) {
                    numbers.push({
                        digit: +currentDigits,
                        lineIndex,
                        endChatIndex: charIndex - 1,
                        startCharIndex: charIndex - currentDigits.length
                    })
                    currentDigits = ''
                }
            }
        }

        if (currentDigits) {
            numbers.push({
                digit: +currentDigits,
                lineIndex,
                endChatIndex: charIndex - 1,
                startCharIndex: charIndex - currentDigits.length
            })
        }
    }

    const numbersWithTouchingSymbolInfo = numbers.map(number => {
        let touchingSymbol = false
        for (const symbol of symbols) {
            if (symbol.lineIndex -1 === number.lineIndex ||
                symbol.lineIndex === number.lineIndex ||
                symbol.lineIndex + 1 === number.lineIndex) {
                    const lowerBound = number.startCharIndex - 1
                    const upperBound = number.endChatIndex + 1

                    touchingSymbol = symbol.charIndex >= lowerBound && symbol.charIndex <= upperBound
                }

            if (touchingSymbol) {
                break
            }
        }

        return {
            ...number,
            touchingSymbol
        }
    })

    const result = numbersWithTouchingSymbolInfo
        .filter(v => v.touchingSymbol)
        .map(v => v.digit)
        .reduce((prev, curr) => prev += curr, 0)


    console.log(result)
}

main()
