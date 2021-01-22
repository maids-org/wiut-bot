/**
 * Keyboard Layout Manager
 * @module layouts/keyboards
 */
import { Markup } from 'telegraf'
import { InlineKeyboardMarkup } from 'telegraf/typings/telegram-types'

export const start = Markup.inlineKeyboard([
    [Markup.callbackButton('Show more information', 'help')]
])

export const help = Markup.inlineKeyboard([
    [Markup.urlButton("Announcement's Channel", 'https://t.me/SeventyPlusBIS')]
])

export const invalid = Markup.inlineKeyboard([
    Markup.callbackButton(`Show available commands`, `help`)
])

export const errorAdmin = Markup.inlineKeyboard([
    Markup.urlButton(`Contact with admin`, `https://t.me/genemator`)
])

export const links = async (): Promise<InlineKeyboardMarkup> => {
    return Markup.inlineKeyboard([
        [
            Markup.urlButton(
                `Announcement Channel`,
                `https://t.me/SeventyPlusBIS`
            )
        ],
        [Markup.urlButton(`Accomodation`, `http://t.me/wiut_accomodation`)],
        [
            Markup.urlButton(
                `General Chat Group`,
                `https://t.me/joinchat/Vao3J-FcSBf5Bo2B`
            )
        ],
        [Markup.urlButton(`Anime focused chat group`, `https://t.me/wiutanime`)]
    ])
}

export const contribute = Markup.inlineKeyboard([
    [Markup.urlButton(`Organization`, `https://github.com/wiut-bis/`)]
])
