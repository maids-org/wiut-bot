import * as fs from "fs";
import { TelegrafContext } from "@type/telegraf";

const phrases = [`Onii-chan! I love you too!`]

export default async (ctx: TelegrafContext): Promise<void> => {
    const message = ctx.message.text.toLowerCase()
    if (message.includes("love") && message.includes("i") && message.includes('you')) {
        await ctx.replyWithHTML(
            phrases[Math.floor(Math.random() * phrases.length)]
        );
    }
}