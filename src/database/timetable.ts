/**
 * Group Timetable Database Extractor
 * @name time database
 * @description extract timetable for a bis group
 * @param {string} chat
 */
import groups from './group'
import { promises } from 'fs'
import { join } from 'path'

interface Day {
    name: string
    tutor: string
    type: string
    start: number
    length: number
    location: string
}

interface Timetable {
    [key: string]: Day[]
}

export default async (chat: string | number): Promise<Timetable> => {
    const chatString = (await groups(chat)).toString() // XY
    const filePath = await promises.readFile(
        join(
            `./timetable/${chatString[0]}BIS`,
            `${chatString[0]}BIS${chatString[1]}.json`
        ),
        {
            encoding: 'utf8'
        }
    )
    return JSON.parse(filePath)
}
