import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as message from '@layouts/messages'
import * as keyboard from '@layouts/keyboards'
import { TelegrafContext } from 'telegraf/typings/context'

composer.start(async (ctx: TelegrafContext) => {
    await ctx.replyWithHTML(message.start, {
        parse_mode: 'HTML',
        reply_markup: keyboard.start
    })
})

middleware(composer)
consoles.module(__filename)
