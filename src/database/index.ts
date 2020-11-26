/**
 * Group Timetable Database Extractor
 * @name time database
 * @description extract timetable for a bis group
 * @param {string} chat
 * @returns {bis1 || bis2 || bis3 || bis4 || bis5 || bis6 || bis7}
 */
import groups from './group'

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

import bis1 = require('../timetable/4BIS1.json')
import bis2 = require('../timetable/4BIS2.json')
import bis3 = require('../timetable/4BIS3.json')
import bis4 = require('../timetable/4BIS4.json')
import bis5 = require('../timetable/4BIS5.json')
import bis6 = require('../timetable/4BIS6.json')
import bis7 = require('../timetable/4BIS7.json')

export default async (chat: string | number): Promise<Timetable> => {
    switch (await groups(chat)) {
        case 1:
            return bis1
        case 2:
            return bis2
        case 3:
            return bis3
        case 4:
            return bis4
        case 5:
            return bis5
        case 6:
            return bis6
        case 7:
            return bis7
    }
}
