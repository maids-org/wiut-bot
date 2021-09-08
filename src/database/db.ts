/**
 * Database Exports
 * @name database
 * @description exporting all database in one point
 * @types {{eternal: *, temporary: *}}
 */

interface Users {
    eternal: Array<number>
    temporary: Array<number | string>
}

interface Banned {
    usernames: Array<string>
    ids: Array<number | string>
}

export const editLink = 'https://github.com/mad-maids/maid.table'

export const users: Users = {
    eternal: [
        756870298,
        341799700,
        730343697
    ],
    temporary: [100000000]
}

export const bans: Banned = {
    ids: [],
    usernames: []
}
