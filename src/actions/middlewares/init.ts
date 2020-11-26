import { composer, middleware } from '@core/bot'
import * as consoles from '@layouts/consoles'
import * as keyboard from '@layouts/keyboards'
import groups from '@database/groups'
import { TelegrafContext } from 'telegraf/typings/context'

composer.command(`init`, async (ctx: TelegrafContext) => {
    const text: string =
        `<b>Ohayōgozaimasu everyone!</b> \n` +
        `Nice to see ya'll at the second semester of ` +
        `Business Information System Course. I hope ya'll ` +
        `gonna finish first semester with good marks and wish ` +
        `ya'll success and luck on upcoming 2nd semester cws! ` +
        `From 2nd semester I'll be assisting and helping you ` +
        `with your classes and I will be sending notifications to ` +
        `you 10 minutes before the classes! Also, you can ask me ` +
        `timetable by typing /timetable command. \n` +
        `\n` +
        `<b>You might have questions like:</b> \n` +
        `Where I've been all this time? So my very first version was ` +
        `created by @genemator senpai & @khassanboi and actively contributed ` +
        `by some of guys in group 4BIS1. I served only for group 4BIS1 as "SENPAI" ` +
        `at the first semester of BIS. Then @khassanboi (a.k.a CR of CRs) came up with ` +
        `an idea of making me available for all groups. Genemator senpai ` +
        `agreed and enhanced me by making my engine even more bigger & responsive. ` +
        `Now, as you can see, I'm here & servin' you ^_^ If you found some bugs or an ` +
        `an error, pls contribute & enhance me. For reaching my repository, just type ` +
        `/contribute command and I'll give you link of repo. \n` +
        `\n` +
        `<b>Thanks for your attention and arigatō! ༼ つ ◕_◕ ༽つ</b>`

    for (let group of groups) {
        await ctx.telegram.sendMessage(group, text, {
            parse_mode: 'HTML',
            reply_markup: keyboard.init
        })
    }
})

middleware(composer)
consoles.module(__filename)
