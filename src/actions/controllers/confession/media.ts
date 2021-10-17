import { TelegrafContext } from "@type/telegraf";

export default async function (ctx: TelegrafContext): Promise<void> {
  await ctx.replyWithHTML(
    `<b>Media option is currently under maintenance. We will release it soon!!!</b>`
  );
}
