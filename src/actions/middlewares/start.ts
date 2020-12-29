import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as message from '@layouts/messages'
import * as keyboard from '@layouts/keyboards'
import { TelegrafContext } from '@type/telegraf'

composer.start(async (ctx: TelegrafContext) => {
    switch (ctx.startPayload) {
        case 'intranet':
            await ctx.replyWithHTML(`Ora, ora... Wanna use intranet, aren't ya senpai?! 😏`, {
                parse_mode: 'HTML',
                reply_markup: keyboard.start
            })
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
