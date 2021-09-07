import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as keyboard from '@layouts/keyboards'
import groups from '@database/groups'
import security from '@actions/security/index'
import { TelegrafContext } from 'telegraf/typings/context'

composer.hears(/\/tell (.*)/gi, async (ctx: TelegrafContext) => {
    const input = ctx.match[1]

    await security(ctx, async () => {
        const text =
            `<b>⚠ ATTENTION: ANNOUNCEMENT ⚠</b> \n` +
            `\n` +
            `<i>${input}</i> \n` +
            `\n` +
            `<b>Sincerely, admins of +70 (or genemator (☞ﾟヮﾟ)☞)</b> \n`

        for (const group of await groups()) {
            await ctx.telegram
                .sendMessage(group, text, {
                    parse_mode: 'HTML',
                    reply_markup: keyboard.help
                })
                .then(async () => {
                    await ctx.replyWithHTML(
                        `<b>Your announcement has been successfully sent to ${group}!</b>`
                    )
                })
                .catch((error) => async () => {
                    await ctx.replyWithHTML(error)
                })
        }
    })
})

composer.hears(/\/tell/, async (ctx: TelegrafContext) => {
    await ctx.replyWithHTML(
        `<b>You requested tell command where you can send announcements to all groups</b>` +
            `\n` +
            `\n` +
            `<i>In order to send an announcement to groups, please use our templates shown below:</i>` +
            `\n` +
            `<code>/tell &lt;your very long text here&gt;</code>` +
            `\n` +
            `\n` +
            `<i>Example:</i>` +
            `\n` +
            `<code>/tell Hello dear users. BIS group are the best!</code>`
    )
})
middleware(composer)
consoles.module(__filename)
