import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";

export const message = {
  prompt: async (ctx: TelegrafContext) =>
    `<b>Confirm your actions please!</b>\n\n` +
    `Are you sure, that you want to register <i>${ctx.match[1]}</i> to our database?`,
  accept: async (status: boolean) =>
    `<b>${
      status
        ? "Thank you for using our service! From tomorrow, you can start using our functionalities! You will start receiving notifications 10 minutes before classes."
        : "Something went wrong. Please try again later."
    }</b>`,
};

export const keyboard = {
  prompt: async (ctx) =>
    Markup.inlineKeyboard([
      Markup.callbackButton("Yes", `confirm_yes_${ctx.match[1]}`),
      Markup.callbackButton("No", `confirm_no_${ctx.match[1]}`),
    ]),
};
