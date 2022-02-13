import { composer, middleware, dungeon } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import { OnlyId } from "@type/dungeon";
import * as resource from "./resource";

const trusted = [756870298];

composer.hears(/^\/admin(.*)/gi, async (ctx: TelegrafContext) => {
  const command = ctx.match[1].trimStart();

  if (!trusted.includes(ctx.message.from.id)) {
    return await ctx.replyWithHTML(
      `Ara-ara 😼... You don't have <b>enough privileges</b> to do this action!`
    );
  }

  try {
    switch (command === "") {
      case true:
        if (!ctx.message.reply_to_message) {
          return await ctx.replyWithHTML(
            `<b>Admin not specified!</b>` +
              `\n` +
              `You may reply the admin's message or send id after command to add it`
          );
        }
        await dungeon.newAdmin(ctx.message.reply_to_message.from.id);
        return await ctx.replyWithHTML(
          `<b>User has been added to admins the database!</b>`
        );
      case false:
        if (command.length < 6) {
          return await ctx.replyWithHTML(
            `User ID has to be <b>6 or more</b> characters length!`
          );
        }
        await dungeon.newAdmin(parseInt(command));
        return await ctx.replyWithHTML(
          `User has been added to admins the database!`
        );
    }
  } catch (_) {
    return await ctx.replyWithHTML(
      `Error occurred while adding the admin. Try little bit later...`
    );
  }
});

middleware(composer);
consoles.module(__filename);
