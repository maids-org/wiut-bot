import { TelegrafContext } from "../../../../src/types/telegraf";

export default async function (ctx: TelegrafContext): Promise<void> {
  ctx.replyWithHTML("<b>Not implemented yet!</b>").catch(null);
}
