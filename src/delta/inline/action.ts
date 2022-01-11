import { composer, middleware } from "@src/core";
import * as consoles from "@src/utils";
import * as resource from "./resource";
import { TelegrafContext } from "@type/telegraf";
import Maidoverflow from "@src/maidoverflow";
import { Result } from "@type/maidoverflow";

composer.on("inline_query", async (ctx: TelegrafContext) => {
  const maidoverflow = new Maidoverflow();
  const { items } = await maidoverflow.search(ctx.inlineQuery.query);

  if (ctx.inlineQuery.query === "") {
    return await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "101",
          title: `Start searching!`,
          description: `Typing things you wanna search for!`,
          input_message_content: {
            message_text: resource.message.start,
            parse_mode: "HTML",
          },
          reply_markup: resource.keyboard.example,
        },
      ],
      { cache_time: 43200 }
    );
  }

  if (items.length === 0) {
    return await ctx.answerInlineQuery(
      [
        {
          type: "article",
          id: "404",
          title: `Not found!`,
          description: `Results corresponding to "${ctx.inlineQuery.query}" not found!`,
          input_message_content: {
            message_text: resource.message.notFound(ctx),
            parse_mode: "HTML",
          },
          reply_markup: resource.keyboard.example,
        },
      ],
      { cache_time: 10 }
    );
  }

  if (items.length !== 0) {
    const response = items.slice(0, 49).map((some: Result) => ({
      type: "article",
      id: some.question_id,
      title: some.title,
      description: some.tags.join(", "),
      thumb_url: some.owner.profile_image,
      input_message_content: {
        message_text: resource.message.found(some),
        parse_mode: "HTML",
      },
      reply_markup: resource.keyboard.found(some),
    }));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return ctx.answerInlineQuery(response, {
      cache_time: 60,
      switch_pm_text: "Tss, don't show it here, go DM!",
      switch_pm_parameter: ctx.inlineQuery.query.replace(/ /g, "-_-"),
    });
  }
});

middleware(composer);
consoles.module(__filename);
