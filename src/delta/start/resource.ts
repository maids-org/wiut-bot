import { InlineKeyboard } from "grammy";

export const message =
  `<b>Welcome to Mad Maid's Northmaid Chan 😏!</b>` +
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
  `<i>In order to see full detailed usage information of the bot, press the button below.</i>`;

export const keyboard = new InlineKeyboard().text("Show more information", "help")

export const payload = `<b>Shall we continue our exploration here?</b>`;

export const inline = (search: string) => new InlineKeyboard().switchInlineCurrent("Restore inline window", search)