import { composer } from "@/providers/global";
import * as consoles from "@/utils/log";
import { MaidContext } from "@type/global";

composer.callbackQuery(/confirm_no/gi, async (ctx: MaidContext) => {
  await ctx.deleteMessage();
  await ctx.reply(
    `<b>Alright, I won't do it. if you change your mind, I'd be here for you!</b>`,
    {
      parse_mode: "HTML",
    },
  );
});

consoles.moduler(__filename);
