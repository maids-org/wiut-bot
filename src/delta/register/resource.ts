import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/telegram-types";
import { promises } from "fs";
import { join } from "path";
import { TelegrafContext } from "telegraf/typings/context";

export const available = async (subgroup?) => {
  if (subgroup) {
    return (await promises.readdir(join("timetable", subgroup))).map((file) =>
      file.replace(".json", "")
    );
  }

  if (!subgroup) {
    return await promises.readdir(join("timetable"));
  }
};

export const admins = async (ctx: TelegrafContext) =>
  await ctx.telegram.getChatAdministrators(ctx.chat.id);

export const isAdmin = async (ctx: TelegrafContext) => {
  return (await admins(ctx))
    .map((admin) => admin.user.id)
    .includes((await ctx.telegram.getMe()).id);
};

export const canInvite = async (ctx: TelegrafContext) => {
  if (await isAdmin(ctx)) {
    for (const admin of await ctx.getChatAdministrators()) {
      if (admin.user.id !== (await ctx.telegram.getMe()).id) continue;
      return admin.can_invite_users;
    }
  }
};

export const message = {
  noPrivate: `<b>Command can't be called on private chat or channels</b>`,
  commandExists: `<b>Why you bully me? This group is already registered!</b>`,
  commandNoAdmin:
    "<b>I won't register this group until I won't get administrator permission!</b>",
  commandNoInvitePerm:
    '<b>Are you kidding with me? You gave me admin, but I with no</b> <i>"Invite Users via Link"</i> <b>permission, huh?</b>',
  commandSuccess: `<b>Choose your course from the buttons above:</b>`,
  commandFail: async (ctx: TelegrafContext): Promise<string> =>
    `<b>We don't register ${ctx.chat.type}s</b>`,
  actionList:
    "<b>Now, choose your group:</b>\n\n<b>If your group is missing, probably it has already been registered by someone! Find it by /groups command</b>",
};

export const keyboard = {
  command: async (): Promise<InlineKeyboardMarkup> =>
    Markup.inlineKeyboard(
      (await available()).map((module) =>
        Markup.callbackButton(module, `register_${module}`)
      ),
      { columns: 3 }
    ),
  action: async (groups: string[]): Promise<InlineKeyboardMarkup> =>
    Markup.inlineKeyboard(
      groups.map((key) => Markup.callbackButton(key, `confirm_prompt_${key}`)),
      {
        columns: 3,
      }
    ),
};
