import { Markup } from "telegraf";

export const message =
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
  `<i>In order to see full detailed usage information of the bot, press the button below.</i>`;

export const keyboard = Markup.inlineKeyboard([
  [Markup.callbackButton("Show more information", "help")],
]);
