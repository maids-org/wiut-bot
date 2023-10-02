import { Composer } from "grammy";
import Dungeon from "@/providers/dungeon";
import { MaidContext } from "@type/conversation";

export const composer = new Composer<MaidContext>();
export const dungeon = new Dungeon(process.env.SUP_URL!, process.env.SUP_KEY!);
