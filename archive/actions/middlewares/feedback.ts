import { composer, middleware } from "../../../src/core/bot";
import * as consoles from "../../../src/utils";
import env from "../../../src/core/env";
import { TelegrafContext } from "telegraf/typings/context";

composer.hears(/\/feedback (.*)/gi, async (ctx: TelegrafContext) => {
  const feedbackText = ctx.match[1];
  await ctx.telegram.sendMessage(
    env.CONTROLLER,
    `<b>New feedback from</b> <code>${ctx.from.id}</code>:` +
      `\n` +
      `\n` +
      `<i>${feedbackText}</i>`,
    {
      parse_mode: "HTML",
    }
  );
  await ctx.replyWithHTML(
    `<b>Thank you for your feedback. Stay stunned for new updates!</b>`
  );
});

composer.hears(/\/feedback/, async (ctx: TelegrafContext) => {
  await ctx.replyWithHTML(
    `<b>You requested feedback command where you can send feedback to admins</b>` +
      `\n` +
      `\n` +
      `<i>In order to send a feedback to us, please use our templates shown below:</i>` +
      `\n` +
      `<code>/feedback &lt;your very long text here&gt;</code>` +
      `\n` +
      `\n` +
      `<i>Example:</i>` +
      `\n` +
      `<code>/feedback Hello dear admins. 4BIS1 group is the best!</code>`,
    {
      parse_mode: "HTML",
    }
  );
});

middleware(composer);
consoles.module(__filename);
