/**
 * Group Parser
 * @name group parser
 * @description return chat id from group name
 * @param {string} name
 * @returns Number
 */

export default async (name: string | undefined) => {
    switch (name) {
        case '4BIS1':
            return -1001475679372
        case '4BIS2':
            return -1001228464622
        case '4BIS3':
            return -1001485097584
        case '4BIS4':
            return -1001196795338
        case '4BIS5':
            return -1001478232152
        case '4BIS6':
            return -1001425513613
        case '4BIS7':
            return -1001186912477
    }
}
