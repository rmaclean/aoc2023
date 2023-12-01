const fs = require('node:fs/promises')

/**
 * read an input
 * @returns {Promise<String>}
 */
const readInputAsText = async () => {
    try {
        const data = await fs.readFile('./day1/input.txt', { encoding: 'utf8' })
        return data
    } catch (err) {
        console.error(err)
        return ""
    }
}

const numberTests = [
    { testString: "zero", value: "0" },
    { testString: "one", value: "1" },
    { testString: "two", value: "2" },
    { testString: "three", value: "3" },
    { testString: "four", value: "4" },
    { testString: "five", value: "5" },
    { testString: "six", value: "6" },
    { testString: "seven", value: "7" },
    { testString: "eight", value: "8" },
    { testString: "nine", value: "9" }
]

/**
 * @param {string} input
 * @returns {string}
 */
const slidingWindowWordsToNumbers = (input) => {
    let currentWindow = ""
    let result = ""

    input.split('').forEach((char) => {
        currentWindow += char
        let digit = undefined
        let testIndex = 0
        while (!digit && testIndex < 10) {
            const numberTest = numberTests[testIndex]
            const foundIndex = currentWindow.indexOf(numberTest.testString)
            if (foundIndex > -1) {
                digit = { length: numberTest.testString.length, value: numberTest.value }
            }

            testIndex++
        }

        if (digit) {
            result += currentWindow.substring(0, currentWindow.length - digit.length) + digit.value
            currentWindow = char
        }
    })

    return result += currentWindow
}

const main = async () => {
    const data = (await readInputAsText())
        .split('\n')
        .map(line => line.toLocaleLowerCase())
        .map(line => {
            return slidingWindowWordsToNumbers(line)
                .split('')
                .filter(char => Number.isInteger(+char))
        })
        .filter(numbers => numbers.length > 0)
        .map(numbers => {
            if (numbers.length === 1) {
                return +(numbers[0] + numbers[0])
            } else {
                return +(numbers[0] + numbers[numbers.length - 1])
            }
        })
        .reduce((prev, curr) => prev += curr, 0)


    console.dir(data)
}

main();
