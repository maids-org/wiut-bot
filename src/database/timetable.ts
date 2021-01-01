/**
 * Group Timetable Database Extractor
 * @name time database
 * @description extract timetable for a bis group
 * @param {string} chat
 */
import groups from './group'
import { promises } from 'fs'
import { join } from 'path'

interface Timetable {
    '0': Array<Record<string, unknown>>
    '1': Array<Record<string, unknown>>
    '2': Array<Record<string, unknown>>
    '3': Array<Record<string, unknown>>
    '4': Array<Record<string, unknown>>
    '5': Array<Record<string, unknown>>
    '6': Array<Record<string, unknown>>
    '7': Array<Record<string, unknown>>
}

export default async (chat: string | number): Promise<Timetable> => {
    const bis1 = await promises.readFile(join('./timetable', '4BIS1.json'), {
        encoding: 'utf8'
    })
    const bis2 = await promises.readFile(join('./timetable', '4BIS1.json'), {
        encoding: 'utf8'
    })
    const bis3 = await promises.readFile(join('./timetable', '4BIS1.json'), {
        encoding: 'utf8'
    })
    const bis4 = await promises.readFile(join('./timetable', '4BIS1.json'), {
        encoding: 'utf8'
    })
    const bis5 = await promises.readFile(join('./timetable', '4BIS1.json'), {
        encoding: 'utf8'
    })
    const bis6 = await promises.readFile(join('./timetable', '4BIS1.json'), {
        encoding: 'utf8'
    })
    const bis7 = await promises.readFile(join('./timetable', '4BIS1.json'), {
        encoding: 'utf8'
    })
    switch (await groups(chat)) {
        case 1:
            return JSON.parse(bis1)
        case 2:
            return JSON.parse(bis2)
        case 3:
            return JSON.parse(bis3)
        case 4:
            return JSON.parse(bis4)
        case 5:
            return JSON.parse(bis5)
        case 6:
            return JSON.parse(bis6)
        case 7:
            return JSON.parse(bis7)
    }
}
