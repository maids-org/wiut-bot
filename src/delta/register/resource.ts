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
  return (await ctx.telegram.getChatAdministrators(ctx.chat.id)).some(
    async (admin) =>
      admin.user.id === (await ctx.telegram.getMe().then((bot) => bot.id))
  );
};

export const message = {
  commandExists: `Why you bully me? This group is already registered!`,
  commandNoAdmin:
    "<b>I won't register this group until I won't get administrator permission!</b>",
  commandNoInvitePerm:
    '<b>Are you kidding with me? You gave me admin, but I with no</b> <i>"Invite Users via Link"</i> <b>permission, huh?</b>',
  commandSuccess: `<b>Choose your course from the buttons above:</b>`,
  commandFail: async (ctx: TelegrafContext): Promise<string> =>
    `<b>We don't register ${ctx.chat.type}s</b>`,
  actionList:
    "<b>Now, choose your group:</b>\n\n<b>If your group is missing, probably it has already been registered by someone!</b>",
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
