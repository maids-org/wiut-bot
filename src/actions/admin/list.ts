import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import security from '@actions/security/index'
import * as database from '@database/db'
import { TelegrafContext } from 'telegraf/typings/context'

composer.command(`list`, async (ctx: TelegrafContext) => {
    await security(ctx, async () => {
        const list: string = database.users.temporary.toString()

        if (list === '') {
            await ctx.replyWithHTML(`<b>Temporary admin list is empty!</b>`, {
                parse_mode: 'HTML'
            })
        } else {
            await ctx.replyWithHTML(
                `<b>Temporary admins:</b>\n<code>${list}</code>`,
                {
                    parse_mode: 'HTML'
                }
            )
        }
    })
})

middleware(composer)
consoles.module(__filename)
