import { TelegrafContext } from '@type/telegraf'
import { scheme } from '@database/user'
import * as message from '@layouts/messages'
import groups from '@database/groups'

export default async function (ctx: TelegrafContext): Promise<void> {
    const templating = async (): Promise<string> => {
        return (
            `<b>🔰 Announcement</b> \n` +
            `\n` +
            `${await scheme[ctx.from.id].messages.join('\n\n')} \n` +
            `\n` +
            `<b>Sincerely, admins of +70 (or genemator (☞ﾟヮﾟ)☞)</b> \n`
        )
    }

    if (scheme[ctx.from.id]) {
        await ctx.replyWithHTML(await templating())
        for (const group of groups) {
            await ctx.telegram.sendMessage(group, await templating(), {
                parse_mode: 'HTML'
            })
        }
        await ctx.replyWithHTML(message.panels.leave)
        delete scheme[ctx.from.id]
    } else {
        await ctx.replyWithHTML(message.panels.noMessage)
    }
}
