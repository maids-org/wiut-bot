/**
 * Time offset calculator
 * @name offset calc
 * @description Uzbekistan's Time Offset finder
 * @return {string}
 */

export default async () => {
    // create Date object for current location
    const date: Date = await new Date()

    // convert to milliseconds, add local time zone offset and get UTC time in milliseconds
    const utcTime =
        (await date.getTime()) + (await date.getTimezoneOffset()) * 60000

    // time offset for Uzbekistan is +5
    const timeOffset: number = 5

    // create new Date object for a different timezone using supplied its GMT offset.
    const UzbTime: Date = await new Date(utcTime + 3600000 * timeOffset)

    // returning week date
    return UzbTime.getDay()
}
