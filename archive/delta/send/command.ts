import { composer, middleware, dungeon } from "../../core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "../../utils/log";
import { OnlyId } from "../../types/dungeon";
import * as resource from "./resource";

function sleep(ms: number) {
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

  let groups = chats.length;

  for (const chat of chats) {
    try {
      await ctx.telegram
        .callApi("copyMessage", {
          chat_id: chat,
          from_chat_id: ctx.message.chat.id,
          message_id: ctx.message.reply_to_message.message_id,
        })
        .then(async ({ message_id }) => {
          await ctx.telegram.pinChatMessage(chat, message_id).catch(null);
        });
      await sleep(1000);
    } catch (e) {
      groups -= 1;
      console.log(e.message, ctx.chat.id);
    }
  }

  return await ctx.replyWithHTML(
    `Done. Sent to ${groups} groups out of ${chats.length}...`,
  );
});

middleware(composer);
consoles.module(__filename);
