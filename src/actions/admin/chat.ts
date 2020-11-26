import { composer, middleware } from '@core/bot'
import env from '@core/env'
import * as consoles from '@layouts/consoles'
import security from '@actions/security/index'
import { TelegrafContext } from 'telegraf/typings/context'

composer.command('chat', async (ctx: TelegrafContext) => {
    await security(ctx, async () => {
        await ctx
            .replyWithHTML(
                `<b>Don't let it flop:</b> <code>${ctx.chat.id}</code>`
            )
            .catch(async () => {
                await ctx.replyWithHTML(
                    `<b>Permission not given for channel/group!</b>`
                )
            })
    })
})

middleware(composer)
consoles.module(__filename)
