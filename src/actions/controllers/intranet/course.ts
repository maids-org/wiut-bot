import { composer, middleware } from '@core/bot'
import { Markup } from 'telegraf'
import * as consoles from '@layouts/consoles'
import { TelegrafContext } from 'telegraf/typings/context'
import { promises } from 'fs'
import { join } from 'path'

composer.action(/intranet_course_(.*)/gi, async (ctx: TelegrafContext) => {
    const course = ctx.match[1]
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
    for (const topic of Object.keys(courseData.data)) {
        keyboard.push([
            Markup.callbackButton(
                `${topic}`,
                `intranet_files_${course}_${topic}`
            )
        ])
    }
    keyboard.push([Markup.callbackButton(`⬅ Back`, `intranet`)])
    await ctx.editMessageText(
        `<b>Choose topic from the list below in order to get files of it:</b>`,
        {
            parse_mode: 'HTML',
            reply_markup: Markup.inlineKeyboard(keyboard)
        }
    )
})

middleware(composer)
consoles.module(__filename)
