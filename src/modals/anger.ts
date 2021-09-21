import * as fs from "fs";
import { TelegrafContext } from "@type/telegraf";

const contents = [
    "CgACAgIAAxkBAAIHLWFJzY712saODb9KiFcYfTzhZ2mTAAIkDwACSqxQSiSeT7LHCkSxIQQ",
]

export default async (ctx: TelegrafContext): Promise<void> => {
    const message = ctx.message.text.toLowerCase()
    if (message.includes("i") && message.includes("mad")) {
        await ctx.replyWithAnimation(
            contents[Math.floor(Math.random() * contents.length)],
        );
    }
}