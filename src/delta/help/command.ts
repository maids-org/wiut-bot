import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import { User } from "@src/database";
import * as resource from "./resource";
import { TelegrafContext } from "telegraf/typings/context";

composer.help(async (ctx: TelegrafContext) => {
  const database = new User(ctx.from.id);

  try {
    if (database.admin) {
      await ctx
        .replyWithHTML(resource.message(true), {
          parse_mode: "HTML",
          reply_markup: resource.keyboard,
        })
        .catch(null);
    } else {
      await ctx
        .replyWithHTML(resource.message(false), {
          parse_mode: "HTML",
          reply_markup: resource.keyboard,
        })
        .catch(null);
    }
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
