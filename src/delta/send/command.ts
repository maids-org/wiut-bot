import { composer, middleware, dungeon } from "@src/core";
import { TelegrafContext } from "@type/telegraf";
import * as consoles from "@src/utils";
import { OnlyId } from "@type/dungeon";
import * as resource from "./resource";
import { Markup } from "telegraf";

let sendVoting = false;
const votingMessage =
  `<b>Ohayo Wiuterians!</b>` +
  `\n` +
  `\n` +
  `No no no no! This is not what you are thinking about! ` +
  `Yeah, like PR thing but not an advertisement. So, we ` +
  `would like to ask for help from students to vote for ` +
  `team UNITE as they were the ones who helped a lot to ` +
  `make our services and platforms come true. Even tho, ` +
  `they halfway sponsor our servers. We are grateful for ` +
  `things that they have done for us. This is not like, <b>YOU MUST DO</b> as others say so, but... ` +
  `<i>can you</i> vote for them to keep supporting our servers and upcoming platforms?... ` +
  `In response, as a celebration of <b>OUR</b> victory, we would create ` +
  `any platform that students would want or need as we have skillfull programmers to make it done ;)` +
  `\n` +
  `\n` +
  `<b>Team UNITE has a set of talented people and amazing collective. Their team consits of:</b>` +
  `\n` +
  `\n` +
  `<b>Saidamirkhon Senpai</b> — President` +
  `\n` +
  `<b>Rustam Kun</b> — Education and Welfare` +
  `\n` +
  `<b>Alobek Chan</b> — General Secretary` +
  `\n` +
  `<b>Abduaziz Kun</b> — Events and Entertainment` +
  `\n` +
  `<b>Malika Chan</b> — Information and Cha-Cha-Cha!` +
  `\n` +
  `<b>Azamat Kun</b> — Sport Events` +
  `\n` +
  `\n` +
  `<b>Any kind of support is appreciated and remembered!</b>`;

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
          await ctx.telegram.pinChatMessage(chat, message_id).catch(null);
        });
      await sleep(1000);
    } catch (e) {
      console.log(e.message);
    }
  }

  return await ctx.replyWithHTML(`Done...`);
});

composer.command("voting", async (ctx: TelegrafContext) => {
  const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
  const chats = (await dungeon.getAllID()).map((id: OnlyId) => id.id);

  if (!admins.includes(ctx.from.id)) {
    return await ctx.replyWithHTML(resource.message.nonAdmin);
  }

  if (sendVoting) {
    return await ctx.replyWithHTML(
      `You want me to send that shit again? Huh? Think about my owner's reputation...`
    );
  }

  let groups = 50;
  sendVoting = true;

  for (const chat of chats) {
    try {
      await ctx.telegram
        .sendMessage(chat, votingMessage, {
          parse_mode: "HTML",
          reply_markup: Markup.inlineKeyboard([
            [
              Markup.urlButton(
                `LESSS GO!!!`,
                `https://intranet.wiut.uz/StudentVoting`
              ),
            ],
          ]),
        })
        .then(async ({ message_id }) => {
          await ctx.telegram.pinChatMessage(chat, message_id).catch(null);
        });
      await sleep(1000);
    } catch (e) {
      groups -= 1;
      console.log(e.message);
    }
  }

  return await ctx.replyWithHTML(`Done. Sent to ${groups} groups...`);
});

middleware(composer);
consoles.module(__filename);
