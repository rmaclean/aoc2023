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

const lineParser = /(Card\s+)(?<card>\d+)(:\s)(?<winningNumbers>(\d|\s)+)\|(?<myNumbers>(\d|\s)+)/

/**
 *
 * @param {string} numberSet
 * @returns {Array<Number>}
 */
const numbersSetToArray = (numberSet) => {
    return numberSet
        .trim()
        .split(' ')
        .filter(numeric => numeric)
        .map(numeric => +numeric)
}


const main = async () => {
    const data = await readInputAsText()
    const cards = data.split('\n')
        .map(line => lineParser.exec(line)?.groups)
        .filter(info => info)
        .map(rawCardData => {
            return {
                ...rawCardData,
                instances: 1,
                winning: numbersSetToArray(rawCardData.winningNumbers),
                mine: numbersSetToArray(rawCardData.myNumbers)
            }
        })
        .map(card => {
            return {
                ...card,
                winningNumbers: card.mine.filter(myNumber => card.winning.indexOf(myNumber) > -1).length,
            }
        })

    let index = 0
    while (index < cards.length) {
        const card = cards[index]
        for (let instanceCount = 0; instanceCount < card.instances; instanceCount++) {

            for (let nextCardOffset = 1; nextCardOffset < card.winningNumbers + 1; nextCardOffset++) {
                const nextCardIndex = nextCardOffset + index
                const nextCard = cards[nextCardIndex]
                if (nextCard) {
                    nextCard.instances++
                }
            }
        }

        index++
    }

    // console.log(cards)

    const cardCount = cards
        .map(card => card.instances)
        .reduce((prev, curr) => prev += curr, 0)

    console.log(cardCount)
}

main()
