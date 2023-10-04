import { Composer } from "grammy";
import Dungeon from "@/providers/dungeon";
import { MaidContext } from "@type/global";
import { Scheduler } from "@/providers/scheduler";

export const composer = new Composer<MaidContext>();
export const dungeon = new Dungeon(process.env.SUP_URL!, process.env.SUP_KEY!);
export const scheduler = new Scheduler();
