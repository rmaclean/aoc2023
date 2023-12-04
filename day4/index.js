const fs = require('node:fs/promises')

/**
 * read an input
 * @returns {Promise<String>}
 */
const readInputAsText = async () => {
    try {
        const data = await fs.readFile('./day4/input.txt', { encoding: 'utf8' })
        return data
    } catch (err) {
        console.error(err)
        return ""
    }
}

const lineParser = /(Card\s)(?<card>\d+)(:\s)(?<winningNumbers>(\d|\s)+)\|(?<myNumbers>(\d|\s)+)/

/**
 *
 * @param {string} numberSet
 * @returns {Array<Number>}
 */
const numbersSetToArray = (numberSet) => {
    return numberSet.trim().split(' ').map(numeric => +numeric)
}

const main = async () => {
    const data = await readInputAsText()
    const result = data.split('\n')
        .map(line => lineParser.exec(line)?.groups)
        .filter(info => info)
        .map(rawCardData => {
            return {
                ...rawCardData,
                winning: numbersSetToArray(rawCardData.winningNumbers),
                mine: numbersSetToArray(rawCardData.myNumbers)
            }
        })
        .map(card => {
            return {
                ...card,
                points: card.mine.reduce((prev, curr) => {
                    const winning = card.winning.indexOf(curr) > -1
                    if (winning) {
                        if (prev === 0) {
                            prev = 1
                        } else {
                            prev *= 2
                        }
                    }

                    return prev
                }, 0)
            }
        })
        .map(card => card.points)
        .reduce((prev, curr) => prev += curr, 0)

    console.log(result)
}

main()
