const fs = require('node:fs/promises')

/**
 * read an input
 * @returns {Promise<String>}
 */
const readInputAsText = async () => {
    try {
        const data = await fs.readFile('./day2/input.txt', { encoding: 'utf8' })
        return data
    } catch (err) {
        console.error(err)
        return ""
    }
}

const prefixParser = /Game\s(?<gameId>\d+):\s(?<gameResults>.+)/
const red = /(?<digit>\d+) red/
const blue = /(?<digit>\d+) blue/
const green = /(?<digit>\d+) green/

/**
 *
 * @param {string} input
 */
const parseGameData = (input) => {
    return input.split('\n')
        .map(line => {
            const parseResult = prefixParser.exec(line)
            const gameResults = parseResult?.groups.gameResults.split(';')
                .map(pull => {
                    return {
                        red: +(red.exec(pull)?.groups.digit ?? 0),
                        blue: +(blue.exec(pull)?.groups.digit ?? 0),
                        green: +(green.exec(pull)?.groups.digit ?? 0)
                    }
                })
            return {
                gameId: +parseResult?.groups.gameId,
                gameResults,
            }
        })
        .filter(data => data.gameId)
}

const main = async () => {
    const input = await readInputAsText()
    const games = parseGameData(input)
    const goals = {
        red: 12,
        green: 13,
        blue: 14
    }

    const validGames = games.map(game => {
        let valid = true
        for (const result of game.gameResults) {
            valid = result.blue <= goals.blue && result.red <= goals.red && result.green <= goals.green

            if (!valid) {
                break
            }
        }

        return {game, valid}
    })

    const score = validGames
        .filter(game => game.valid)
        .map(game => game.game.gameId)
        .reduce((prev, curr) => prev += curr, 0)

    console.log(score)
}

main()
