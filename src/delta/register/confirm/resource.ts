import { InlineKeyboard } from "grammy";
import { Parser } from "@type/global";

export const parsers: Parser = {
  accept: /confirm_yes_(.+)/gi,
  prompt: /confirm_prompt_(.+)/gi,
};

export const message = {
  prompt: async (match: string) =>
    `<b>Confirm your actions please!</b>\n\n` +
    `Are you sure, that you want to register <i>${match}</i> to our database?`,
  accept: async (status: boolean) =>
    `<b>${
      status
        ? "Thank you for using our service! From tomorrow, you can start using our functionalities! You will start receiving notifications 10 minutes before classes."
        : "Something went wrong. Please try again later."
    }</b>`,
};

export const keyboard = {
  prompt: async (match: string) =>
    new InlineKeyboard()
      .text("Yes", `confirm_yes_${match}`)
      .text("No", `confirm_no`),
};
