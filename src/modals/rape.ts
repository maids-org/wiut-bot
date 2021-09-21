import * as fs from "fs";
import { TelegrafContext } from "@type/telegraf";

// const phrases = [`Onii-chan! I love you too!`]

const contents = [fs.readFileSync("./voices/yamete.ogg")];

export default async (ctx: TelegrafContext): Promise<void> => {
  const message = ctx.message.text.toLowerCase();
  if (message.includes("rape")) {
    await ctx.replyWithVoice({ source: contents[0] });
  }
};
