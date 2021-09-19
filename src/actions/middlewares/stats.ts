import { composer, middleware } from "@core/bot";
import { Markup } from "telegraf";
import * as consoles from "@layouts/consoles";
import * as database from "@database/db";
import { TelegrafContext } from "telegraf/typings/context";

composer.command(`stats`, async (ctx: TelegrafContext) => {
  const status = {
    id: ctx.from.id,
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name,
    username: ctx.from.username,
    captcha: async () => {
      if (ctx.from.is_bot) return `bot`;
      else return `person`;
    },
    lang: ctx.from.language_code,
    superuser: async () => {
      if (
        database.users.eternal.includes(ctx.from.id) ||
        database.users.temporary.includes(ctx.from.username)
      ) {
        return `admin`;
      } else {
        return `non-admin`;
      }
    },
  };

  const keyboard = Markup.inlineKeyboard([
    [
      Markup.urlButton(
        `Marks (SRS SBL)`,
        `https://srs.wiut.uz/My_Marks.aspx?Rubx2a6BsX3IPOwAVHKhPW7MkWTYrMbkVtDHVgSbJP%2fGUZDTbo5RfAvNndJSu9zBFYdp3KqIDMI%3d`
      ),
    ],

    [
      Markup.urlButton(
        `Marks (Intranet)`,
        `https://intranet.wiut.uz/Home/StudentProfile`
      ),
    ],
  ]);

  await ctx.replyWithHTML(
    `<b>User status preview:</b>` +
      `\n` +
      `\n` +
      `<b>ID:</b> <code>${status.id}</code>` +
      `\n` +
      `<b>First Name:</b> <code>${status.first_name}</code>` +
      `\n` +
      `<b>Last Name:</b> <code>${status.last_name}</code>` +
      `\n` +
      `<b>Username:</b> <code>${status.username}</code>` +
      `\n` +
      `<b>Captcha:</b> <code>${await status.captcha()}</code>` +
      `\n` +
      `<b>Language:</b> <code>${status.lang}</code>` +
      `\n` +
      `<b>Status:</b> <code>${await status.superuser()}</code>`,
    {
      parse_mode: "HTML",
      reply_markup: keyboard,
    }
  );
});

middleware(composer);
consoles.module(__filename);
