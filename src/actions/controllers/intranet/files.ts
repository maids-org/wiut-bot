import { composer, middleware } from '@core/bot'
import { Markup } from 'telegraf'
import * as consoles from '@layouts/consoles'
import { TelegrafContext } from 'telegraf/typings/context'
import { promises } from 'fs'
import { join } from 'path'

composer.action(/intranet_files_(.+)_(.+)/gi, async (ctx: TelegrafContext) => {
    const course = ctx.match[1]
    const topics = ctx.match[2]
    const courseDataFunction = async () => {
        const file = await promises.readFile(
            join('./intranet', `${course}.json`),
            {
                encoding: 'utf8'
            }
        )
        return {
            name: course,
            data: {
                ...JSON.parse(file)
            }
        }
    }
    const courseData = await courseDataFunction()
    const keyboard = []
    for (const topic of courseData.data[`${topics}`]) {
        keyboard.push([Markup.urlButton(`${topic.name}`, `${topic.link}`)])
    }
    keyboard.push([
        Markup.callbackButton(`⬅ Back`, `intranet_course_${course}`)
    ])
    const text =
        `🎛 <b>IntraneX V0.3.3 Beta</b>` +
        `\n` +
        `\n` +
        `📼 <b>There you can list out links of files that exist on our database.</b>` +
        `\n` +
        `\n` +
        `⚠ <b>Choose a file from the list below in order to get url link to it:</b>` +
        `\n` +
        `\n` +
        `👉🏻 <b>Cursor:</b> <code>intranet/${course}/${topics}</code>`
    await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: Markup.inlineKeyboard(keyboard)
    })
})

middleware(composer)
consoles.module(__filename)
