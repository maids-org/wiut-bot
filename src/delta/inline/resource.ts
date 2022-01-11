import { Result } from "@type/maidoverflow";
import { Markup } from "telegraf";
import { TelegrafContext } from "@type/telegraf";

export const message = {
  found: (some: Result) =>
    `<b>Maidoverflow</b> \n` +
    `\n` +
    `<b>Question:</b> ${some.title}` +
    `\n` +
    (some.owner.display_name &&
      "<b>Owner:</b> " + some.owner.display_name + `\n`) +
    (some.answer_count && "<b>Answers:</b> " + some.answer_count + `\n`) +
    (some.creation_date &&
      "<b>Created:</b> " +
        `${new Date(some.creation_date * 1000).toLocaleString()}` +
        `\n`) +
    (some.last_activity_date &&
      "<b>Last activity:</b> " +
        `${new Date(some.last_activity_date * 1000).toLocaleString()}` +
        `\n`) +
    `<b>Answered:</b>` +
    ` <code>${some.is_answered ? "✅" : "❌"}</code>`,
  notFound: (ctx: TelegrafContext) =>
    `<b>"${ctx.inlineQuery.query}" not found!</b>` +
    `\n` +
    `Try some another shit and maybe it will be found somewhere in holy Stackoverflow!`,
  start:
    `<b>Hello Maid!</b>` +
    `\n` +
    `You requested inline mode. Using this feature, ` +
    `you can search for Stackoverflow topics without opening ` +
    `website or trying to Google it!` +
    `\n` +
    `Simply, type: <code>@westmaid_bot &lt;your question here&gt;</code>` +
    `\n`,
};

export const keyboard = {
  found: (some: Result) =>
    Markup.inlineKeyboard([Markup.urlButton("Go to page", some.link)]),
  example: Markup.inlineKeyboard([
    [Markup.switchToCurrentChatButton(`For example...`, `hello world`)],
  ]),
};
