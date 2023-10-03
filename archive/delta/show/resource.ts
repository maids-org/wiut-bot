import { Markup } from "telegraf";
import { TelegrafContext } from "@type/telegraf";

export const admins = async (ctx: TelegrafContext) =>
  await ctx.telegram.getChatAdministrators(ctx.chat.id);

export const isAdmin = async (ctx: TelegrafContext, target: number) => {
  return (await admins(ctx)).map((admin) => admin.user.id).includes(target);
};

export const message = {
  notRegistered: `<b>This group is not registered to our database</b> Use /register to register this group`,
  notAdmin: `You don't <b>enough privileges</b> to change this kind of properties`,
  text: `<b>Choose whether shall we show your group at /group command or not...</b>`,
  call: (newMode: boolean) =>
    `<b>Choose whether shall we show your group at /group command or not...</b>` +
    `\n` +
    `New mode has been set to <b>${newMode ? "ON" : "OFF"}</b>`,
};

export const keyboard = (mode: boolean) =>
  Markup.inlineKeyboard([
    Markup.callbackButton(`Show ${mode ? "✅" : ""}`, "show_on"),
    Markup.callbackButton(`Hide ${mode ? "" : "✅"}`, "show_off"),
  ]);
