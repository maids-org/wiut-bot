import * as database from '@database/db'
import * as message from '@layouts/messages'
import * as keyboard from '@layouts/keyboards'

import { TelegrafContext } from 'telegraf/typings/context'

export default async (ctx: TelegrafContext, func: Function) => {
    if (
        database.users['eternal'].includes(ctx.from.id) ||
        database.users['temporary'].includes(ctx.from.username)
    ) {
        await func()
    } else {
        await ctx.replyWithHTML(message.error_admin, {
            parse_mode: 'HTML',
            reply_markup: keyboard.error_admin
        })
    }
}
