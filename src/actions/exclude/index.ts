import { composer, middleware } from "@core/bot";
import * as consoles from "@layouts/consoles";
import { TelegrafContext } from "@type/telegraf";
import Modals from "@modals/index"

const phrases = {
  exception: [`You are not my onii chan!`, `Your PP is too small`, `Eh? Who are you?`],
};

composer.on('animation' , async (ctx) => {
  await console.log(ctx.message)
})

composer.on("text", async (ctx: TelegrafContext) => {
  const message = ctx.message.text.toLowerCase()
  if (ctx.message.from.id === 103666150 || ctx.message.from.id === 756870298) {
    await Modals(ctx)
  } else {
    await ctx.replyWithHTML(
        phrases.exception[Math.floor(Math.random() * phrases.exception.length)]
    );
  }

  /**
   * Ignore in cases removed due to chat bot addition
   */

  // if (ctx.chat.type === "private")
  //   if (!ctx.message.via_bot)
  //     await ctx.replyWithHTML(message.invalid, {
  //       parse_mode: "HTML",
  //       reply_markup: keyboard.invalid,
  //     });
});

middleware(composer);
consoles.module(__filename);
