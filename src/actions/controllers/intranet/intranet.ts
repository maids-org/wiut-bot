import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as database from '@database/db'
import { TelegrafContext } from 'telegraf/typings/context'
import { promises } from 'fs'
import { join } from 'path'
import { Markup } from 'telegraf'
import identifier from './identifier'

composer.action(`intranet`, async (ctx: TelegrafContext) => {
    if (
        database.bans.ids.includes(ctx.from.id) ||
        database.bans.usernames.includes(ctx.from.username)
    ) {
        await ctx.editMessageText(
            `<b>Hey, wait a minute! I remember this account...</b>\n` +
                `<i>Yeah, it's you! Go stick to your restrictions!</i>\n` +
                `<i>That's for blaming my master @genemator</i>`,
            {
                parse_mode: 'HTML'
            }
        )
    } else {
        const dir = await promises.readdir('./intranet')
        const courseIdentifier = dir.filter((name) => name.endsWith('.json'))
        const courses = await Promise.all(
            courseIdentifier.map(async (name) => {
                const file = await promises.readFile(join('./intranet', name), {
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
        const keyboard = []
        for (const key of courses) {
            keyboard.push([
                Markup.callbackButton(
                    `${await identifier(key.name)}`,
                    `intranet_course_${key.name}`
                )
            ])
        }
        const text =
            `🎛 <b>IntraX V0.3.3 Beta</b>` +
            `\n` +
            `\n` +
            `📼 <b>Welcome to intranet explorer. ` +
            `\n` +
            `Brought to you by @genemator and @khassanboi</b>` +
            `\n` +
            `\n` +
            `⚠ <b>Instruction:</b> <i>use buttons provided below in order to interact with datasets, choose a module from the list in order to get resources:</i>` +
            `\n` +
            `\n` +
            `👉🏻 <b>Cursor:</b> <code>intranet/</code>`
        await ctx.editMessageText(text, {
            parse_mode: 'HTML',
            reply_markup: Markup.inlineKeyboard(keyboard)
        })
    }
})

middleware(composer)
consoles.module(__filename)
