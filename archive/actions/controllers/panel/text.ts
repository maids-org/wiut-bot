import { TelegrafContext } from "../../../../src/types/telegraf";
import { scheme } from "../../../../src/database/user";

export default async function (ctx: TelegrafContext): Promise<void> {
  try {
    if (!scheme[ctx.from.id]) {
      scheme[ctx.from.id] = {};
    }
    if (!scheme[ctx.from.id].messages) {
      scheme[ctx.from.id].messages = [];
    }
  } catch (err) {
    await ctx
      .reply("Facing with some trouble while initializing data!", {
        reply_to_message_id: ctx.message.message_id,
      })
      .catch(null);
    await console.log(err);
  }

  try {
    if (ctx.message.text) {
      scheme[ctx.from.id].messages.push(ctx.message.text);
      await ctx.reply(
        "This text message has been added to database, keep adding!",
        {
          reply_to_message_id: ctx.message.message_id,
        }
      );
    } else {
      await ctx.reply("Sorry, that message has some errors!", {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } catch (err) {}
}
