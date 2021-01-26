import { TelegrafContext } from '@type/telegraf'
import { scheme } from '@database/user'
import * as message from '@layouts/messages'

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
    try {
        if (scheme[ctx.from.id])
            await ctx.replyWithHTML(await templating())
        else await ctx.replyWithHTML(message.panels.noMessage)
    } catch (err) {
        await ctx.replyWithHTML("<b>Oops, there are some issues with formatting!</b>")
        console.log(err)
    }

}
