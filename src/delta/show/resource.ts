import { Markup } from "telegraf";

export const message = {
  notRegistered: `<b>This group is not registered to our database</b> Use /register to register this group`,
  notAdmin: `You don't <b>enough privileges</b> to see servers stats`,
  text: `<b>Choose whether shall we show your group at /group command or not...</b>`,
  call: (newMode: boolean) =>
    `<b>Choose whether shall we show your group at /group command or not...</b>` +
    `\n` +
    `New mode has been set to <b>${newMode ? "ON" : "OFF"}</b>`,
};

export const keyboard = (mode: boolean) =>
  Markup.inlineKeyboard([
    Markup.callbackButton(`Show ${mode ? "✅" : ""}`, "show_on"),
    Markup.callbackButton(`Hide ${mode ? "" : "✅"}`, "show_on"),
  ]);
