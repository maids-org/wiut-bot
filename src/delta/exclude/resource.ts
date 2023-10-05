import { dungeon } from "@/providers/global";
import { OnlyId } from "@/types/dungeon";
import { InlineKeyboard } from "grammy";

export const message = {
  unknown: `<b>Hey, I didn't get this command or message. Please see my command list for more information!</b>`,
  newMember: `<b>Woah, hewwo everywody!</b> \n` +
    `\n` +
    `Glad to see you all inviting me to your dungeon. Before we proceed further, ` +
    `we need to register this group to its corresponding module in order to use all my features. ` +
    `In order to register, please activate /register command in this group. This command has to ` +
    `be executed by admin of this group only. Also, you may use /setup command to setup this group ` +
    `with basic configurations. For more, please see /help command or contact mad maids community.`
};

export const keyboard = {
  unknown: new InlineKeyboard().text(
    "Show available commands",
    "help",
  ),
  newMember: new InlineKeyboard().url(
    "Join Mad Maids Community",
    `https://t.me/madmaids/105348`
  )
};

export const admins = async () => {
  return (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
};
