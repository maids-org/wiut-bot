import { join } from "node:path";
import { promises } from "node:fs";
import { InlineKeyboard } from "grammy";
import { MaidContext, Parser } from "@type/global";

export const parsers: Parser = {
  group: /register_(.+)/gi,
};

export const available = async (subgroup?: string) => {
  if (subgroup) {
    return (await promises.readdir(join("data", "timetable", subgroup))).map(
      (file) => file.replace(".json", ""),
    );
  }

  return await promises.readdir(join("data", "timetable"));
};

export const admins = async (ctx: MaidContext) =>
  await ctx.getChatAdministrators();

export const isAdmin = async (ctx: MaidContext) => {
  return (await admins(ctx)).map((admin) => admin.user.id).includes(ctx.me.id);
};

export const canInvite = async (ctx: MaidContext) => {
  if (await isAdmin(ctx)) {
    for (const admin of await ctx.getChatAdministrators()) {
      if (admin.user.id !== ctx.me.id) continue;
      return "can_invite_users" in admin ? admin.can_invite_users : false;
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
  commandFail: async (ctx: MaidContext): Promise<string> =>
    `<b>We don't register ${ctx.chat!.type}s</b>`,
  actionList:
    "<b>Now, choose your group:</b>\n\n<b>If your group is missing, probably it has already been registered by someone! Find it by /groups command</b>",
};

export const keyboard = {
  command: async (): Promise<InlineKeyboard> => {
    const keyboard = new InlineKeyboard();

    (await available())!.map((module) =>
      keyboard.text(module, `register_${module}`),
    );

    return keyboard.toFlowed(1);
  },
  action: async (groups: string[]): Promise<InlineKeyboard> => {
    const keyboard = new InlineKeyboard();

    groups.map((key) => keyboard.text(key, `confirm_prompt_${key}`));

    return keyboard.toFlowed(3);
  },
};
