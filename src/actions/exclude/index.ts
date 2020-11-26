import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as message from '@layouts/messages'
import * as keyboard from '@layouts/keyboards'
import { TelegrafContext } from '@type/telegraf'

composer.on('text', async (ctx: TelegrafContext) => {
    if (ctx.chat.type === 'private')
        if (!ctx.message.via_bot)
            await ctx.replyWithHTML(message.invalid, {
                parse_mode: 'HTML',
                reply_markup: keyboard.invalid
            })
})

middleware(composer)
consoles.module(__filename)
