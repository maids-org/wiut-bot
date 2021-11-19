import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/utils";
import security from "../security";
import { TelegrafContext } from "telegraf/typings/context";

composer.command("chat", async (ctx: TelegrafContext) => {
  await security(ctx, async () => {
    await ctx
      .replyWithHTML(`<b>Don't let it flop:</b> <code>${ctx.chat.id}</code>`)
      .catch(async () => {
        await ctx.replyWithHTML(
          `<b>Permission not given for channel/group!</b>`
        );
      });
  });
});

middleware(composer);
consoles.module(__filename);
