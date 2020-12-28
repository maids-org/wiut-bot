import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as message from '@layouts/messages'
import * as keyboard from '@layouts/keyboards'
import * as database from '@database/db'
import { TelegrafContext } from 'telegraf/typings/context'

composer.action(`copy_accept`, async (ctx: TelegrafContext) => {
    if (
        database.bans.ids.includes(ctx.from.id) ||
        database.bans.usernames.includes(ctx.from.username)
    )
        await ctx.editMessageText(
            `<b>Hey, wait a minute! I remember this account... ` +
                `Yeah, it's you! Go stick to your restrictions! ` +
                `That's for blaming my master @genemator</b>`,
            {
                parse_mode: 'HTML'
            }
        )
    else
        await ctx.editMessageText(
            `<b>Please choose module from the list below:</b>`,
            {
                parse_mode: 'HTML',
                reply_markup: keyboard.help
            }
        )
})

middleware(composer)
consoles.module(__filename)
