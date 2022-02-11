import { composer, middleware, dungeon } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import { OnlyId } from "@type/dungeon";
import * as resource from "./resource";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

composer.command("check", async (ctx: TelegrafContext) => {
  return await ctx.replyWithHTML(resource.message.id(ctx));
});

composer.command("send", async (ctx: TelegrafContext) => {
  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
  const chats = (await dungeon.getAllID()).map((id: OnlyId) => id.id);

  if (!admins.includes(ctx.from.id)) {
    return await ctx.replyWithHTML(resource.message.nonAdmin);
  }

  if (!ctx.message.reply_to_message) {
    return await ctx.replyWithHTML(resource.message.noReply);
  }

  for (const chat of chats) {
    try {
      await ctx.telegram
        .callApi("copyMessage", {
          chat_id: chat,
          from_chat_id: ctx.message.chat.id,
          message_id: ctx.message.reply_to_message.message_id,
        })
        .then(async ({ message_id }) => {
          await ctx.pinChatMessage(chat, message_id).catch(null);
        });
      await sleep(1000);
    } catch (e) {
      console.log(e.message);
    }
  }
});

middleware(composer);
consoles.module(__filename);
