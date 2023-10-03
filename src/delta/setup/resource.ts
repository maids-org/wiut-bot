import { InlineKeyboard } from "grammy";
import { MaidContext } from "@type/global";

export const admins = async (ctx: MaidContext) =>
  await ctx.getChatAdministrators();

export const isAdmin = async (ctx: MaidContext) => {
  return (await admins(ctx)).map((admin) => admin.user.id).includes(ctx.me.id);
};

export const isUserAdmin = async (ctx: MaidContext, target: number) => {
  return (await admins(ctx)).map((admin) => admin.user.id).includes(target);
};

export const canChange = async (ctx: MaidContext): Promise<boolean> => {
  if (await isAdmin(ctx)) {
    for (const admin of await ctx.getChatAdministrators()) {
      if (admin.user.id !== ctx.me.id) continue;
      return "can_change_info" in admin ? admin.can_change_info : false;
    }
  }
  return false;
};

export const message = {
  confirm: `Are you sure you want to me to change credentials of <b>this group?</b>`,
  commandNoAdmin:
    "<b>I can't setup! Give me more administration privileges~</b>",
  notRegistered: `<b>This group is not registered to our database</b> Use /register to register this group`,
  commandNoChangePerm:
    '<b>Are you kidding with me? You gave me admin, but with no</b> <i>"Change info & details"</i> <b>permission, huh?</b>',
  notAdmin: `You don't <b>enough privilege</b> to run that command`,
  noPrivate: `<b>Command can't be called on private chat or channels</b>`,
};

export const keyboard = new InlineKeyboard()
  .text("Yup", "setup_yes")
  .text("Nope", "setup_no");
