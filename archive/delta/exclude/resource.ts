import { Markup } from "telegraf";
import { dungeon } from "../../core";
import { OnlyId } from "../../types/dungeon";

export const message = `<b>Hey, I didn't get this command or message. Please see my command list for more information!</b>`;

export const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton(`Show available commands`, `help`),
]);

export const admins = async () => {
  return (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
};
