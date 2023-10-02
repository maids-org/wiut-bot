import { dungeon } from "@/providers/global";
import { OnlyId } from "@/types/dungeon";
import { InlineKeyboard } from "grammy";

export const message = `<b>Hey, I didn't get this command or message. Please see my command list for more information!</b>`;

export const keyboard = new InlineKeyboard().text(
  "Show available commands",
  "help",
);

export const admins = async () => {
  return (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
};
