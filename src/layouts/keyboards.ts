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
        [
            Markup.urlButton(`4BIS1`, `https://t.me/The4BIS1`),
            Markup.urlButton(`4BIS2`, `https://t.me/The4BIS2`)
        ],
        [
            Markup.urlButton(`4BIS3`, `https://t.me/The4BIS3`),
            Markup.urlButton(`4BIS4`, `https://t.me/The4BIS4`)
        ],
        [
            Markup.urlButton(`4BIS5`, `https://t.me/The4BIS5`),
            Markup.urlButton(`4BIS6`, `https://t.me/The4BIS6`)
        ],
        [Markup.urlButton(`4BIS7`, `https://t.me/The4BIS7`)]
    ])
}

export const contribute = Markup.inlineKeyboard([
    [Markup.urlButton(`Organization`, `https://github.com/wiut-bis/`)]
])

export const init = Markup.inlineKeyboard([
    [Markup.urlButton(`My father's website`, `https://genemator.me/`)],
    [Markup.urlButton(`My cousin's website`, `http://khassanboi.uz/`)]
])

export const shelter = Markup.inlineKeyboard([
    [
        Markup.urlButton(
            `Enter the shelter`,
            `https://github.com/wiut-bis/shelter`
        )
    ]
])

export const intranet = Markup.inlineKeyboard([
    [Markup.callbackButton(`Computer Science Fundamentals`, `csf`)],
    [
        Markup.callbackButton(
            `Introduction to Statistics and Data Science`,
            `isds`
        )
    ]
])
