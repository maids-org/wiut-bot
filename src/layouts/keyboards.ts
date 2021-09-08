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
    [Markup.urlButton("Announcement's Channel", 'https://t.me/SeventyPlus')]
])

export const invalid = Markup.inlineKeyboard([
    Markup.callbackButton(`Show available commands`, `help`)
])

export const errorAdmin = Markup.inlineKeyboard([
    Markup.urlButton(`Contact with admin`, `https://t.me/genemator`)
])

export const links = async (): Promise<InlineKeyboardMarkup> => {
    return Markup.inlineKeyboard([
        [Markup.urlButton(`Announcement Channel`, `https://t.me/SeventyPlus`)],
        [Markup.callbackButton(`Private Group Chats`, `links_group`)],
        [
            Markup.urlButton(
                `General Chat Group (5BIS)`,
                `https://t.me/joinchat/Vao3J-FcSBf5Bo2B`
            )
        ],
        [Markup.urlButton(`General Chat Group (4BIS)`, `https://t.me/BIS_24`)],
        [
            Markup.urlButton(
                `Mad Maids General Community`,
                `https://t.me/madmaids`
            )
        ],
        [Markup.urlButton(`Anime focused chat group`, `https://t.me/wiutanime`)]
    ])
}

export const linksGroup = async (): Promise<InlineKeyboardMarkup> => {
    return Markup.inlineKeyboard([
        [Markup.callbackButton(`4BIS`, `links_group_4`)],
        [Markup.callbackButton(`5BIS`, `links_group_5`)],
        [Markup.callbackButton(`⬅ Back`, `links`)]
    ])
}

export const linksGroupChat = async (
    to: number
): Promise<InlineKeyboardMarkup> => {
    switch (to) {
        case 4:
            return Markup.inlineKeyboard([
                [
                    Markup.urlButton(
                        `4BIS1`,
                        `https://t.me/joinchat/6YJxV620kYxlMTMy`
                    )
                ],
                [
                    Markup.urlButton(
                        `4BIS2`,
                        `https://t.me/joinchat/K-BH5QuIWZw4NTNi`
                    )
                ],
                [
                    Markup.urlButton(
                        `4BIS3`,
                        `https://t.me/joinchat/DVijw8_BMeUyYmMy`
                    )
                ],
                [
                    Markup.urlButton(
                        `4BIS4`,
                        `https://t.me/joinchat/RBHZE376nrE3MDVi`
                    )
                ],
                [
                    Markup.urlButton(
                        `4BIS5`,
                        `https://t.me/joinchat/ho0JF_sjo4szMTNi`
                    )
                ],
                [
                    Markup.urlButton(
                        `4BIS6`,
                        `https://t.me/joinchat/N3wyphSQgr00Njhi`
                    )
                ],
                [Markup.callbackButton(`⬅ Back`, `links_group`)]
            ])
        case 5:
            return Markup.inlineKeyboard([
                [
                    Markup.urlButton(
                        `5BIS1`,
                        `https://t.me/joinchat/OmkEDTN8NX4wZjFi`
                    )
                ],
                [
                    Markup.urlButton(
                        `5BIS2`,
                        `https://t.me/joinchat/_V7dNGYCcOM4NDJi`
                    )
                ],
                [
                    Markup.urlButton(
                        `5BIS3`,
                        `https://t.me/joinchat/1T7go2nro85mY2Iy`
                    )
                ],
                [
                    Markup.urlButton(
                        `5BIS4`,
                        `https://t.me/joinchat/w3C3vkgQ1Fs5Yzg6`
                    )
                ],
                [
                    Markup.urlButton(
                        `5BIS5`,
                        `https://t.me/joinchat/G1gLe0CUFXUwZTVi`
                    )
                ],
                [
                    Markup.urlButton(
                        `5BIS6`,
                        `https://t.me/joinchat/YFXlQi0lBvBjYzEy`
                    )
                ],
                [Markup.callbackButton(`⬅ Back`, `links_group`)]
            ])
    }
}

export const contribute = Markup.inlineKeyboard([
    [Markup.urlButton(`Organization`, `https://github.com/mad-maids/`)]
])
