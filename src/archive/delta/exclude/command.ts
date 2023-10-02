import { composer, middleware } from "@/archive/core";
import * as consoles from "@/archive/utils/log";
import { TelegrafContext } from "@type/telegraf";
import * as resource from "./resource";
import { admins } from "./resource";

composer.on("text", async (ctx: TelegrafContext) => {
  try {
    if (ctx.chat.type === "private") {
      if ((await admins()).includes(ctx.from.id)) {
        return await ctx.replyWithHTML(
          `<b>You have been identified as admin</b>` +
            `\n` +
            `If you want to <b>send it to all groups</b>, simply reply <code>/send</code> to this message`,
          {
            reply_to_message_id: ctx.message.message_id,
          },
        );
      }

      if (!ctx.message.via_bot) {
        return await ctx
          .replyWithHTML(resource.message, {
            parse_mode: "HTML",
            reply_markup: resource.keyboard,
          })
          .catch(null);
      }
    }
  } catch (error) {
    consoles.errors(error);
  }
});

middleware(composer);
consoles.module(__filename);
