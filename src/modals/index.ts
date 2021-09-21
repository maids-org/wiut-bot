import love from "./love"
import rape from "./rape"
import anger from "./anger"

import { TelegrafContext } from "@type/telegraf";

export default async (ctx: TelegrafContext): Promise<void> => {
    await love(ctx)
    await rape(ctx)
    await anger(ctx)
}