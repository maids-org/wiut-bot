import cron from 'node-cron'
import { promises } from 'fs'
import { join } from 'path'
import { composer, middleware, bot } from '@core/bot'
import * as consoles from '@layouts/consoles'
import parser from '@database/parse'
;(async () => {
    const dirLocations = ['./timetable/4BIS', './timetable/5BIS']
    for (const dirLocation of dirLocations) {
        const dir = await promises.readdir(dirLocation)
        const groupIdentifier = dir.filter((name) => name.endsWith('.json'))
        const groups = await Promise.all(
            groupIdentifier.map(async (name) => {
                const file = await promises.readFile(join(dirLocation, name), {
                    encoding: 'utf8'
                })
                return {
                    name: name.replace('.json', ''),
                    data: {
                        ...JSON.parse(file)
                    }
                }
            })
        )
        for (const group of groups) {
            for (const day of Object.keys(group.data)) {
                for (const subject of group.data[day]) {
                    cron.schedule(
                        `50 ${subject.start - 1.0} * * ${day}`,
                        async () => {
                            const groupTo = await parser(group.name)
                            console.log(groupTo)
                            const text =
                                `<b>⚠️ Upcoming Class Notification</b> \n` +
                                `\n` +
                                `<b>10 minutes left</b> for <code>${subject.name} ${subject.type}</code> class. ` +
                                `Please, get ready as soon as possible!` +
                                `\n` +
                                `\n` +
                                `You should attend the seminars on-campus and lectures online.` +
                                `\n` +
                                `\n` +
                                `The class is going to be held by <b>${subject.tutor}</b> at <code>${subject.location}</code> \n`

                            await bot.telegram
                                .sendMessage(groupTo, text, {
                                    parse_mode: 'HTML'
                                })
                                .catch(null)
                        },
                        {
                            timezone: 'Asia/Tashkent'
                        }
                    )
                }
            }
        }
    }
})()

middleware(composer)
consoles.module(__filename)
