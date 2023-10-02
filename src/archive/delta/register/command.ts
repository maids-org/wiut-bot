import { composer, middleware, dungeon } from "@/archive/core";
import * as consoles from "@/archive/utils/log";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";

composer.command("register", async (ctx: TelegrafContext) => {
  try {
    if (ctx.chat.type === "private" || ctx.chat.type === "channel") {
      return await ctx.replyWithHTML(resource.message.noPrivate);
    }

    if (
      (await dungeon.getAllID())
        .map((content) => content.id)
        .includes(ctx.chat.id)
    ) {
      return await ctx.replyWithHTML(resource.message.commandExists);
    }

    if (!(await resource.isAdmin(ctx))) {
      return await ctx.replyWithHTML(resource.message.commandNoAdmin);
    }

    if (!(await resource.canInvite(ctx))) {
      return await ctx.replyWithHTML(resource.message.commandNoInvitePerm);
    }

    if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
      await ctx.replyWithHTML(resource.message.commandSuccess, {
        reply_markup: await resource.keyboard.command(),
      });
    } else {
      await ctx.replyWithHTML(await resource.message.commandFail(ctx));
    }
  } catch (error) {
    consoles.errors(error);
  }
});

// composer.command("unregister", async (ctx: TelegrafContext) => {
//   if (ctx.chat.type === "private" || ctx.chat.type === "channel") {
//     return await ctx.replyWithHTML(resource.message.noPrivate);
//   }
//
//   await ctx.replyWithHTML(`<b>Deleting this group from our database...</b>`);
//
//   // Check is requester admin or not
//   const admins = (await ctx.getChatAdministrators()).map(
//     (user) => user.user.id
//   );
//   if (!admins.includes(ctx.message.from.id)) {
//     return await ctx.replyWithHTML(
//       `<b>Hold on bud, you're not admin to do this action!`
//     );
//   }
//
//   // Check if the group is registered in database
//   if (
//     !(await dungeon.getAllID())
//       .map((content) => content.id)
//       .includes(ctx.chat.id)
//   ) {
//     return await ctx.replyWithHTML(`<b>It's not even registered bud!</b>`);
//   }
//
//   try {
//     await dungeon.removeGroup(ctx.chat.id);
//     await ctx.replyWithHTML(
//       `<b>So sad seeing you unregistering! Hope you will register me again...</b>`
//     );
//   } catch (e) {
//     await ctx.replyWithHTML(
//       `<b>I can't delete this group for some reason!</b>`
//     );
//   }
// });

composer.command("revoke", async (ctx: TelegrafContext) => {
  if (ctx.chat.type === "private" || ctx.chat.type === "channel") {
    return await ctx.replyWithHTML(resource.message.noPrivate);
  }

  await ctx.replyWithHTML(`<b>Updating the link of this group ...</b>`);

  // Check is requester admin or not
  const admins = (await ctx.getChatAdministrators()).map(
    (user) => user.user.id,
  );
  if (!admins.includes(ctx.message.from.id)) {
    return await ctx.replyWithHTML(
      `<b>Hold on bud, you're not admin to do this action!`,
    );
  }

  // Check if the group is registered in database
  if (
    !(await dungeon.getAllID())
      .map((content) => content.id)
      .includes(ctx.chat.id)
  ) {
    return await ctx.replyWithHTML(`<b>It's not even registered bud!</b>`);
  }

  const invite = await ctx.exportChatInviteLink();

  try {
    await dungeon.updateLink(ctx.chat.id, invite);
    await ctx.replyWithHTML(
      `<b>I'm done bud! Don't worry to call me again if something happens with invite link!</b>`,
    );
  } catch (e) {
    await ctx.replyWithHTML(
      `<b>I can't create an invite link for some reason!</b>`,
    );
  }
});

middleware(composer);
consoles.module(__filename);
