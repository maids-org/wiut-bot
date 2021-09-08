import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as message from '@layouts/messages'
import * as keyboard from '@layouts/keyboards'
import { TelegrafContext } from '@type/telegraf'

composer.start(async (ctx: TelegrafContext) => {
    switch (ctx.startPayload) {
        case 'intranet':
            await ctx.replyWithHTML(
                `<b>Ora, ora... Wanna use intranet, aren't ya senpai?! 😏</b>\n` +
                    `<i>Feel free to use command /intranet to access intranet from now so on!</i>`,
                {
                    parse_mode: 'HTML',
                    reply_markup: keyboard.start
                }
            )
            break
        case 'links':
            await ctx.replyWithHTML(
                `<b>Ohayo Senpai! Take those links and find your groups that you will need...</b>` +
                    `\n` +
                    `\n` +
                    `<b>BIS group chats are located at</b> <code>Private Group Chats</code> <b>section!</b>`,
                {
                    reply_markup: await keyboard.links()
                }
            )
            break
        default:
            await ctx.replyWithHTML(message.start, {
                parse_mode: 'HTML',
                reply_markup: keyboard.start
            })
            break
    }
})

middleware(composer)
consoles.module(__filename)
