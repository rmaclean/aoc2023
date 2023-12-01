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

const main = async () => {
    const data = (await readInputAsText())
        .split('\n')
        .map(line => {
            return line.split('')
                .filter(char => Number.isInteger(+char))
        }).map(numbers => +(numbers[0].toString() + numbers[numbers.length-1].toString()))
        .reduce((prev, curr) => prev += curr, 0)


    console.dir(data)
}

main();
