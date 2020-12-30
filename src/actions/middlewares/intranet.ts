import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import { TelegrafContext } from 'telegraf/typings/context'
import { Markup } from 'telegraf'

composer.command(`intranet`, async (ctx: TelegrafContext) => {
    // TODO: there must be added tracker of law lovers!!!
    const copyright =
        `<b>Dear ${ctx.from.first_name},</b>\n` +
        `Before opening intranet page, we would like to ` +
        `inform you that by using our copy of intranet infos ` +
        `you take all responsibilities to yourself, we don't ` +
        `care about your privacy bla-bla, so if you think that ` +
        `we are obligating copyright things, pls gotta hell out ` +
        `and delete our bot from your list and never ever comeback! ` +
        `If you're too into this restrictions, feel free to learn and ` +
        `solve tha test without our materials. We do apologize for being ` +
        `little bit rough, anyway, it's up to you, you know...\n` +
        `\n` +
        `<i>By the way, your id, username will be checked, just in order to ensure ` +
        `if our law lovers using it or not, they are not granted to use this source (banned)...</i>`
    await ctx.replyWithHTML(copyright, {
        parse_mode: 'HTML',
        reply_markup: Markup.inlineKeyboard([
            [Markup.callbackButton(`I don't care, I'm in!`, `intranet`)],
            [
                Markup.callbackButton(
                    `I'm too loyal for restrictions`,
                    `intranet_decline`
                )
            ]
        ])
    })
})

middleware(composer)
consoles.module(__filename)
