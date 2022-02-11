import { TelegrafContext } from "@type/telegraf";

export const message = {
  id: (ctx: TelegrafContext) =>
    `<b>Your user id is:</b> <code>${ctx.from.id}</code>`,
  nonAdmin: `<b>You</b> are not <b>eligible</b> to run this chat bud. You need to get admin access to run this command...`,
  noReply: `You should <b>reply</b> a message, so I can <b>copy</b> contents of this message and send it to <b>all groups</b>...`,
};
