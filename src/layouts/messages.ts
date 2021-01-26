/**
 * Message Template Layout Manager
 * @module layouts/messages
 */

export const start: string =
    `<b>Welcome to BIS Groups 😏!</b>` +
    `\n` +
    `\n` +
    `Hi Sugar!) I'm West Maid that helps you to keep tracking upcoming lessons, guides and gives you more information about BIS ╰(*°▽°*)╯.` +
    `\n` +
    `\n` +
    `With my help, you can do:` +
    `\n` +
    `\n` +
    `<code>* Get information about yourself & modules</code>` +
    `\n` +
    `<code>* Get informed about upcoming classes</code>` +
    `\n` +
    `<code>* Check your timetable for today</code>` +
    `\n` +
    `<code>* Leave a feedback to admins</code>` +
    `\n` +
    `\n` +
    `Hey, I hope we can get to know each other 😄` +
    `\n` +
    `\n` +
    `<i>In order to see full detailed usage information of the bot, press the button below.</i>`

export const help = (isAdmin: boolean): string => {
    const base: string =
        `<b>List of available commands:</b>` +
        `\n` +
        `\n` +
        `/help - <code>show this helper message</code>` +
        `\n` +
        `/stats - <code>check stats of user</code>` +
        `\n` +
        `/links - <code>show url links</code>` +
        `\n` +
        `/intranet - <code>accessing intranet</code>` +
        `\n` +
        `/timetable - <code>today's timetable</code>` +
        `\n` +
        `/contribute - <code>enhance me more</code>` +
        `\n` +
        `/feedback - <code>leave a feedback to admins</code>`
    const admin: string =
        `\n` +
        `\n` +
        `<b>Admin commands:</b>` +
        `\n` +
        `/add - <code>add temporary admin</code>` +
        `\n` +
        `/send - <code>send message to users</code>` +
        `\n` +
        `/reset - <code>reset temporary admin list</code>` +
        `\n` +
        `/list - <code>list temporary admins</code>` +
        `\n` +
        `/tell - <code>send message to all groups</code>` +
        `\n` +
        `\n` +
        `<i>Be careful! Restricted for non-admin users.` +
        ` Heavily checked and database tested zone</i>`
    if (isAdmin) return base + admin
    else return base
}

export const invalid = `<b>Hey, I didn't get this command or message. Please see my command list for more information!</b>`

export const errorAdmin = `<b>You don't have enough power to do that!</b>`

export const invalidQuery = `<b>Ehm!</b>`

export const contributes = `<b>I'm so happy that you wanted to upgrade me, but starting from 2021th year, my Genemator Senpai decided to contribute me on private. However, you can join our organization and be able to contribute me then!</b>`

export const links = `<b>Here are BIS groups & channels:</b>`

export const panels: {
    entry: string
    help: string
    leave: string
    noMessage: string
    destroy: string
} = {
    entry:
        '<b>Welcome to our admin panel of announcing section!</b>\n\n' +
        'Here you can send your contents and we will be processing it to send to groups!\n' +
        'In order to get started, keep in mind that you have to interact with the help those commands:\n' +
        '\n' +
        '/help - <code>show this message</code>\n' +
        '/clear - <code>clear all messages</code>\n' +
        '/show - <code>preview all your message you wanna send</code>\n' +
        '/send - <code>composer all your messages and send</code>',
    help:
        '<b>Here are the available commands:</b>' +
        '/help - <code>show this message</code>\n' +
        '/clear - <code>clear all messages</code>\n' +
        '/show - <code>preview all your message you wanna send</code>\n' +
        '/send - <code>composer all your messages and send</code>',
    leave:
        "<b>Successfully composed all messages. Alright, it's the end. Thanks for using me!</b>",
    noMessage: '<b>There is no message to show or composer!</b>',
    destroy: '<b>All messages has been deleted... Feel free to start again!</b>'
}
