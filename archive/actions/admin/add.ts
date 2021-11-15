import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/layouts/consoles";
import security from "../security";
import * as database from "@database/db";
import { TelegrafContext } from "telegraf/typings/context";

composer.hears(/\/add (.+)/gi, async (ctx: TelegrafContext) => {
  await security(ctx, async () => {
    await database.users.temporary.push(ctx.match[1]);
    await ctx.replyWithHTML(`<b>Successfully added a temporary admin!</b>`);
  });
});

composer.hears(/\/add/, async (ctx: TelegrafContext) => {
  await security(ctx, async () => {
    await ctx.replyWithHTML(
      `<b>Adding temporary admins:</b>` +
        `\n` +
        `<code>/add &lt;id&gt;</code>` +
        `\n` +
        `\n` +
        `<b>Example:</b>` +
        `\n` +
        `<code>/add 123456789</code>`,
      {
        parse_mode: "HTML",
      }
    );
  });
});

middleware(composer);
consoles.module(__filename);
