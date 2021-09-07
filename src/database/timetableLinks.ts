import group from '@database/group'

export default async (chat: string | number): Promise<string> => {
    const groupNumber: number = await group(chat)
    const baseUrl = 'https://intranet.wiut.uz/TimeTableNew/GetLessons?classid='
    switch (groupNumber) {
        // TODO: ID links are not correct, re-fix needed!
        case 41:
            return baseUrl + '3AD620ED9D52D489'
        case 42:
            return baseUrl + '9D18790AA0A06F1C'
        case 43:
            return baseUrl + '5F5C8D5732AA2CC2'
        case 44:
            return baseUrl + '0A167E569D7833F3'
        case 45:
            return baseUrl + 'F4CF63D7D055D870'
        case 46:
            return baseUrl + 'E597FA2E4C55C50E'
        case 51:
            return baseUrl + '3DAF1B9A4F40036F'
        case 52:
            return baseUrl + '3DAF1B9A4F40036F'
        case 53:
            return baseUrl + '3DAF1B9A4F40036F'
        case 54:
            return baseUrl + '3DAF1B9A4F40036F'
        case 55:
            return baseUrl + '3DAF1B9A4F40036F'
        case 56:
            return baseUrl + '3DAF1B9A4F40036F'
        default:
            return 'https://intranet.wiut.uz/TimeTableNew/GetLessons'
    }
}
