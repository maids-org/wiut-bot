import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import { TelegrafContext } from "telegraf/typings/context";
import { Markup } from "telegraf";
import { promises } from "fs";
import { join } from "path";
import fetch from "node-fetch";

composer.command("register", async (ctx: TelegrafContext) => {
  const data = await fetch(
    "https://maid-dungeon.vercel.app/groups"
  ).then((res) => res.json());
  const ids = data.results.map((group) => group.id);
  const admins = await ctx.telegram.getChatAdministrators(ctx.chat.id); // bot number 2144804659
  const amIAdmin = admins.some((admin) => admin.user.id === 2144804659);
  let canICreateInviteLink: boolean;

  if (ids.includes(ctx.chat.id)) {
    return await ctx.replyWithHTML(
      `Why you bully me? This group is already registered!`
    );
  }

  if (!amIAdmin) {
    return await ctx.replyWithHTML(
      "<b>I won't register this group until I won't get administrator permission!</b>"
    );
  }

  if (amIAdmin) {
    canICreateInviteLink = admins
      .map((admin) => admin.user.id === 2144804659 && admin.can_invite_users)
      .includes(true);
    if (!canICreateInviteLink) {
      return await ctx.replyWithHTML(
        '<b>Are you kidding with me? You gave me admin, but I with no</b> <i>"Invite Users via Link"</i> <b>permission, huh?</b>'
      );
    }
  }

  if (
    ctx.chat.type === "group" ||
    ctx.chat.type === "supergroup" ||
    ctx.chat.type === "private"
  ) {
    const availableGroups = await promises.readdir(join("timetable"));
    const keyboard = availableGroups.map((module) =>
      Markup.callbackButton(module, `register_${module}`)
    );
    await ctx.replyWithHTML(
      `<b>Choose your course from the buttons above:</b>`,
      {
        reply_markup: Markup.inlineKeyboard(keyboard, {
          columns: 3,
        }),
      }
    );
  } else {
    await ctx.replyWithHTML(`<b>We don't register ${ctx.chat.type}s</b>`);
  }
});

middleware(composer);
consoles.module(__filename);
