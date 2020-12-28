import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import { TelegrafContext } from 'telegraf/typings/context'

composer.action(`copy_decline`, async (ctx: TelegrafContext) => {
    await ctx.telegram.sendMessage(
        process.env.CONTROLLER,
        `User ${ctx.from.id} declined copy rights!`
    )
    await ctx.editMessageText(
        `Ok, delete that chat and you're free to learn yourself!`,
        {
            parse_mode: 'HTML'
        }
    )
})

middleware(composer)
consoles.module(__filename)
