import { composer, middleware } from '@core/bot'
import { Markup } from 'telegraf'
import * as consoles from '@layouts/consoles'
import dataset from '@database/timetable'
import group from '@database/group'
import { TelegrafContext } from 'telegraf/typings/context'

composer.action(/tomorrow_(.+)/gi, async (ctx: TelegrafContext) => {
    const tomorrowDay = parseInt(ctx.match[1])
    const database = await dataset(ctx.chat.id)

    const tomorrow = async () => {
        let text = `<b>⛓ Timetable for Tomorrow for 4BIS${await group(
            ctx.chat.id
        )} ⛓</b>`

        for (const subject of database[tomorrowDay]) {
            const subText =
                `\n` +
                `\n` +
                `<b>💠 Name:</b> <i>${subject.name}</i> \n` +
                `<b>🌀 Type:</b> <i>${subject.type}</i> \n` +
                `<b>👨‍💻 Tutor:</b> <i>${subject.tutor}</i> \n` +
                `<b>⏰ Time (start-end):</b> <code>${subject.start}-${
                    subject.start + subject.length
                }</code>`

            text += subText
        }

        if (database[tomorrowDay][0] === undefined) {
            text +=
                `\n` +
                `\n` +
                `<b>🎉 Feel free to enjoy today, you don't have any classes!</b>`
        }

        const editLink = `https://github.com/wiut-bis/maid/tree/main/timetable`
        const editString =
            `\n` +
            `\n` +
            `<b>⚠ If you found mistake, please take consider correcting</b> <a href="${editLink}">timetable</a> <b>in our repository!</b>`

        text += editString

        return text
    }

    await ctx.editMessageText(await tomorrow(), {
        parse_mode: 'HTML',
        reply_markup: Markup.inlineKeyboard([
            [Markup.callbackButton(`◀ Back`, `timetable`)],
            [
                Markup.urlButton(
                    `🕸 Webtable`,
                    `https://intranet.wiut.uz/TimeTableNew/GetLessons?classid=3AD620ED9D52D489`
                )
            ]
        ]),
        disable_web_page_preview: true
    })
})

middleware(composer)
consoles.module(__filename)
