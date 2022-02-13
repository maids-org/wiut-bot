// import { composer, middleware, dungeon } from "@src/core";
// import * as consoles from "@src/utils";
// import * as resource from "./resource";
// import { TelegrafContext } from "@type/telegraf";
// import { OnlyId } from "@type/dungeon";
//
// composer.command(`server`, async (ctx: TelegrafContext) => {
//   const admins = (await dungeon.getAllAdmins()).map((user: OnlyId) => user.id);
//
//   if (admins.includes(ctx.from.id)) {
//     return await ctx.replyWithHTML(
//       `You don't enough pirivleges to see servers stats`
//     );
//   }
//
//   const groups = (await dungeon.getAllID()).length;
// });
//
// middleware(composer);
// consoles.module(__filename);
