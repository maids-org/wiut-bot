import cron from 'node-cron'
import { promises } from 'fs'
import { join } from 'path'
import { Markup } from 'telegraf'
import { composer, middleware, bot } from '@core/bot'

import * as consoles from '@layouts/consoles'
import identifier from '@actions/cron/identifier'
import parser from '@database/parse'
;(async () => {
    const dir = await promises.readdir('./timetable')
    const groupIdentifier = dir.filter((name) => name.endsWith('.json'))
    const groups = await Promise.all(
        groupIdentifier.map(async (name) => {
            const file = await promises.readFile(join('./timetable', name), {
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
    for (let group of groups) {
        for (let day of Object.keys(group['data'])) {
            for (let subject of group['data'][day]) {
                await cron.schedule(
                    `50 ${subject['start'] - 1.0} * * ${day}`,
                    async () => {
                        const groupTo = parser(group['name'])

                        const text =
                            `<b>⛓ Upcoming Class Notification ⛓</b> \n` +
                            `\n` +
                            `⚠ <b>10 minutes left</b> for <code>${subject['name']} ${subject['type']}</code> class. ` +
                            `Please, get ready as soon as possible! ` +
                            `You can get to the website by pressing buttons below: `

                        const keyboard = Markup.inlineKeyboard([
                            [
                                Markup.urlButton(
                                    `📺 Video Conference`,
                                    await identifier(subject['acronym'])
                                )
                            ]
                        ])

                        await bot.telegram
                            .sendMessage(await groupTo, text, {
                                parse_mode: 'HTML',
                                reply_markup: keyboard
                            })
                            .then(async (message) => {
                                await bot.telegram
                                    .pinChatMessage(
                                        await groupTo,
                                        message.message_id
                                    )
                                    .catch(null)
                            })
                    },
                    {
                        timezone: 'Asia/Tashkent'
                    }
                )
            }
        }
    }
})()

middleware(composer)
consoles.module(__filename)
