/**
 * Admin Panel Session
 * @panel
 * @description Create another session with submodule system
 */

import { middleware, composer } from "../../../../src/core/bot";
import * as consoles from "../../../../src/utils";
import { Stage, BaseScene } from "telegraf";
import { TelegrafContext } from "../../../../src/types/telegraf";
import security from "../../security";

// Functions
import help from "./help";
import show from "./show";
import clear from "./clear";
import enter from "./enter";
import text from "./text";
import left from "./leave";
import wbis from "./wbis";

// WARNING! Constants
const panel = new BaseScene("panel");
const scenes = new Stage([panel]);
const { leave } = Stage;

// Obfuscate session manager
panel
  .enter(async (ctx: TelegrafContext) => await enter(ctx))
  .help(async (ctx: TelegrafContext) => await help(ctx))
  .command("show", async (ctx: TelegrafContext) => await show(ctx))
  .command("clear", async (ctx: TelegrafContext) => await clear(ctx))
  .command("stop", leave())
  .on("text", async (ctx: TelegrafContext) => await text(ctx))
  .on(
    ["photo", "video", "animation", "audio", "sticker"],
    async (ctx: TelegrafContext) => await wbis(ctx)
  )
  .leave(async (ctx: TelegrafContext) => await left(ctx));

// Command manager

composer.command("panel", async (ctx: TelegrafContext) => {
  await security(ctx, async () => {
    await ctx.scene.enter("panel");
  });
});

middleware(scenes);
middleware(composer);
consoles.module(__filename);
