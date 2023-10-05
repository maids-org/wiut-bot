import { composer } from "@/providers/global";
import { MaidContext } from "@type/global";

import * as consoles from "@/utils/log";
import * as resource from "./resource";

composer.on("message", async (ctx: MaidContext) => {
  if (ctx.message) {
    if (ctx.message.text) {
      try {
        if (ctx.chat && ctx.chat.type === "private") {
          if ((await resource.admins()).includes(ctx.from!.id)) {
            return await ctx.reply(
              `<b>You have been identified as admin</b>` +
                `\n` +
                `If you want to <b>send it to all groups</b>, simply reply <code>/send</code> to this message`,
              {
                parse_mode: "HTML",
                reply_to_message_id: ctx.message!.message_id,
              },
            );
          }

          if (!ctx.message.via_bot) {
            return await ctx
              .reply(resource.message.unknown, {
                parse_mode: "HTML",
                reply_markup: resource.keyboard.unknown,
              })
              .catch(null);
          }
        }
      } catch (error) {
        consoles.errors(error);
      }
    }
    try {
      if (ctx.message.new_chat_members) {
        const filtrated = ctx.message.new_chat_members.filter(
          (user) => user.username === ctx.me.username,
        );

        if (filtrated.length > 0) {
          return await ctx.reply(resource.message.newMember, {
            parse_mode: "HTML",
            reply_markup: resource.keyboard.newMember,
          });
        }
      }
    } catch (error) {
      consoles.errors(error);
    }
  }
});

consoles.moduler(__filename);
