import { Markup } from "telegraf";
import { TelegrafContext } from "@type/telegraf";

export const admins = async (ctx: TelegrafContext) =>
  await ctx.telegram.getChatAdministrators(ctx.chat.id);

export const isAdmin = async (ctx: TelegrafContext) => {
  return (await admins(ctx))
    .map((admin) => admin.user.id)
    .includes((await ctx.telegram.getMe()).id);
};

export const isUserAdmin = async (ctx: TelegrafContext, target: number) => {
  return (await admins(ctx)).map((admin) => admin.user.id).includes(target);
};

export const canChange = async (ctx: TelegrafContext) => {
  if (await isAdmin(ctx)) {
    for (const admin of await ctx.getChatAdministrators()) {
      if (admin.user.id !== (await ctx.telegram.getMe()).id) continue;
      return admin.can_change_info;
    }
  }
};

export const message = {
  confirm: `Are you sure you want to me to change credentials of <b>this group?</b>`,
  commandNoAdmin:
    "<b>I can't setup! Give me more administration privileges~</b>",
  notRegistered: `<b>This group is not registered to our database</b> Use /register to register this group`,
  commandNoChangePerm:
    '<b>Are you kidding with me? You gave me admin, but with no</b> <i>"Change info & details"</i> <b>permission, huh?</b>',
  notAdmin: `You don't <b>enough privileges</b> to run that command`,
  noPrivate: `<b>Command can't be called on private chat or channels</b>`,
};

export const keyboard = Markup.inlineKeyboard([
  Markup.callbackButton(`Yup`, `setup_yes`),
  Markup.callbackButton(`Nope`, `setup_no`),
]);
