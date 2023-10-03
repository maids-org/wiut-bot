import { composer, dungeon } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.command("register", async (ctx: MaidContext): Promise<any> => {
  try {
    if (ctx.chat!.type === "private" || ctx.chat!.type === "channel") {
      return await ctx.reply(resource.message.noPrivate, {
        parse_mode: "HTML",
      });
    }

    if (
      (await dungeon.getAllID())
        .map((content) => content.id)
        .includes(ctx.chat!.id)
    ) {
      return await ctx.reply(resource.message.commandExists, {
        parse_mode: "HTML",
      });
    }

    if (!(await resource.isAdmin(ctx))) {
      return await ctx.reply(resource.message.commandNoAdmin, {
        parse_mode: "HTML",
      });
    }

    if (!(await resource.canInvite(ctx))) {
      return await ctx.reply(resource.message.commandNoInvitePerm, {
        parse_mode: "HTML",
      });
    }

    if (ctx.chat!.type === "group" || ctx.chat!.type === "supergroup") {
      return await ctx.reply(resource.message.commandSuccess, {
        parse_mode: "HTML",
        reply_markup: await resource.keyboard.command(),
      });
    } else {
      return await ctx.reply(await resource.message.commandFail(ctx), {
        parse_mode: "HTML",
      });
    }
  } catch (error) {
    consoles.errors(error);
  }
});

composer.command("unregister", async (ctx: MaidContext): Promise<any> => {
  if (ctx.chat!.type === "private" || ctx.chat!.type === "channel") {
    return await ctx.reply(resource.message.noPrivate, {
      parse_mode: "HTML",
    });
  }

  await ctx.reply(`<b>Deleting this group from our database...</b>`, {
    parse_mode: "HTML",
  });

  // Check is requester admin or not
  const admins = (await ctx.getChatAdministrators()).map(
    (user) => user.user.id,
  );
  if (!admins.includes(ctx.message!.from.id)) {
    return await ctx.reply(
      `<b>Hold on bud, you're not admin to do this action!`,
      {
        parse_mode: "HTML",
      },
    );
  }

  // Check if the group is registered in database
  if (
    !(await dungeon.getAllID())
      .map((content) => content.id)
      .includes(ctx.chat!.id)
  ) {
    return await ctx.reply(`<b>It's not even registered bud!</b>`, {
      parse_mode: "HTML",
    });
  }

  try {
    await dungeon.removeGroup(ctx.chat!.id);
    await ctx.reply(
      `<b>So sad seeing you unregistering! Hope you will register me again...</b>`,
      {
        parse_mode: "HTML",
      },
    );
  } catch (e) {
    await ctx.reply(`<b>I can't delete this group for some reason!</b>`, {
      parse_mode: "HTML",
    });
  }
});

composer.command("revoke", async (ctx: MaidContext): Promise<any> => {
  if (ctx.chat!.type === "private" || ctx.chat!.type === "channel") {
    return await ctx.reply(resource.message.noPrivate, {
      parse_mode: "HTML",
    });
  }

  await ctx.reply(`<b>Updating the link of this group ...</b>`, {
    parse_mode: "HTML",
  });

  // Check is requester admin or not
  const admins = (await ctx.getChatAdministrators()).map(
    (user) => user.user.id,
  );
  if (!admins.includes(ctx.message!.from.id)) {
    return await ctx.reply(
      `<b>Hold on bud, you're not admin to do this action!`,
      {
        parse_mode: "HTML",
      },
    );
  }

  // Check if the group is registered in database
  if (
    !(await dungeon.getAllID())
      .map((content) => content.id)
      .includes(ctx.chat!.id)
  ) {
    return await ctx.reply(`<b>It's not even registered bud!</b>`, {
      parse_mode: "HTML",
    });
  }

  const invite = await ctx.exportChatInviteLink();

  try {
    await dungeon.updateLink(ctx.chat!.id, invite);
    await ctx.reply(
      `<b>I'm done bud! Don't worry to call me again if something happens with invite link!</b>`,
      {
        parse_mode: "HTML",
      },
    );
  } catch (e) {
    await ctx.reply(
      `<b>I can't create an invitation link for some reason!</b>`,
      {
        parse_mode: "HTML",
      },
    );
  }
});

consoles.moduler(__filename);
