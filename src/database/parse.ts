/**
 * Group Parser
 * @name group parser
 * @description return chat id from group name
 * @param {string} name
 * @returns Number
 */

import { promises } from 'fs'
import { join } from 'path'

export default async (name: string | undefined): Promise<number> => {
    const nameString = parseInt(`${name[0]}${name[4]}`) // 41
    const json = JSON.parse(
        await promises.readFile(join(`./`, `groups.json`), {
            encoding: 'utf8'
        })
    )
    return Object.keys(json).reduce((ret, key) => {
        ret[json[key]] = key
        return ret
    }, {})[nameString]
}
