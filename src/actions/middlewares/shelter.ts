import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as message from '@layouts/messages'
import * as keyboard from '@layouts/keyboards'
import { TelegrafContext } from 'telegraf/typings/context'

composer.command(`shelter`, async (ctx: TelegrafContext) => {
    await ctx.replyWithHTML(message.shelter, {
        parse_mode: 'HTML',
        reply_markup: await keyboard.shelter
    })
})

middleware(composer)
consoles.module(__filename)
