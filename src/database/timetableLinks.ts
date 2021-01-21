import group from '@database/group'

export default async (chat: string | number): Promise<string> => {
    const groupNumber: number = await group(chat)
    const baseUrl = 'https://intranet.wiut.uz/TimeTableNew/GetLessons?classid='
    switch (groupNumber) {
        case 1:
            return baseUrl + '3AD620ED9D52D489'
        case 2:
            return baseUrl + '8E5132D2251A8B02'
        case 3:
            return baseUrl + '5F5C8D5732AA2CC2'
        case 4:
            return baseUrl + '0A167E569D7833F3'
        case 5:
            return baseUrl + 'F4CF63D7D055D870'
        case 6:
            return baseUrl + 'E597FA2E4C55C50E'
        case 7:
            return baseUrl + '3DAF1B9A4F40036F'
        default:
            return 'https://intranet.wiut.uz/TimeTableNew/GetLessons'
    }
}
