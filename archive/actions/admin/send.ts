import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/layouts/consoles";
import security from "../security";
import groups from "@database/groups";
import { TelegrafContext } from "telegraf/typings/context";

composer.hears(/\/send (.*) : (.*)/, async (ctx: TelegrafContext) => {
  const issue = ctx.match[1];
  const status = ctx.match[2];

  await security(ctx, async () => {
    for (const group of await groups()) {
      await ctx.telegram
        .sendMessage(
          group,
          `<b>📠 The issue:</b>` +
            `\n` +
            `<i>${issue}</i>` +
            `\n` +
            `\n` +
            `<b>🎛 Status of request:</b>` +
            `\n` +
            `<i>${status}</i>`,
          {
            parse_mode: "HTML",
          }
        )
        .then(async () => {
          await ctx.replyWithHTML(`<b>Successfully sent! ✅</b>`);
        });
    }
  });
});

composer.hears(/\/send/, async (ctx: TelegrafContext) => {
  await ctx.replyWithHTML(
    `<b>Sending a message to users:</b>` +
      `\n` +
      `<code>/send &lt;issue : status&gt;</code>` +
      `\n` +
      `\n` +
      `<b>Example:</b>` +
      `\n` +
      `<code>/send some issue here : Completed and ready to work!</code>`,
    {
      parse_mode: "HTML",
    }
  );
});

middleware(composer);
consoles.module(__filename);
