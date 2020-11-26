/**
 * Group Timetable Database Extractor
 * @name time database
 * @description extract timetable for a bis group
 * @param {string} chat
 * @returns {bis1 || bis2 || bis3 || bis4 || bis5 || bis6 || bis7}
 */
const bis1 = require('../../timetable/4BIS1.json')
const bis2 = require('../../timetable/4BIS2.json')
const bis3 = require('../../timetable/4BIS3.json')
const bis4 = require('../../timetable/4BIS4.json')
const bis5 = require('../../timetable/4BIS5.json')
const bis6 = require('../../timetable/4BIS6.json')
const bis7 = require('../../timetable/4BIS7.json')

import groups from './group'

export default async (chat: string | number) => {
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
