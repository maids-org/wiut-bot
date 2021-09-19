import { TelegrafContext } from "@type/telegraf";

export default async function (ctx: TelegrafContext): Promise<void> {
  ctx.replyWithHTML("<b>Not implemented yet!</b>").catch(null);
}
