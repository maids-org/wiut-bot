/**
 * Group Identifier
 * @name group
 * @description return group number from chat id
 * @returns Number
 */

export default async (chat: number | string) => {
    switch (chat) {
        case -1001475679372:
            return 1
        case -1001228464622:
            return 2
        case -1001485097584:
            return 3
        case -1001196795338:
            return 4
        case -1001478232152:
            return 5
        case -1001425513613:
            return 6
        case -1001186912477:
            return 7
    }
}
