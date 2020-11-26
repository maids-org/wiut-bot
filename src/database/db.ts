/**
 * Database Exports
 * @name database
 * @description exporting all database in one point
 * @type {{eternal: *, temporary: *}}
 */

interface Users {
    eternal: Array<number>
    temporary: Array<number | string>
}

export const users: Users = {
    eternal: [
        756870298,
        1291710566,
        736452073,
        1279456254,
        1100492815,
        1087968824
    ],
    temporary: [100000000]
}
