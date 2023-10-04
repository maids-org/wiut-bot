import { InlineKeyboard } from "grammy";
import { Lesson } from "@type/database";

export const message = (
  isTenMinuteLeft: boolean,
  subject: Lesson,
  group: string,
): string =>
  isTenMinuteLeft
    ? `<b>⚠️ Upcoming Class Notification for ${group}</b> \n` +
      `\n` +
      `<b>10 minutes left</b> for <code>${subject.name} ${subject.type}</code> class. ` +
      `Please, get ready as soon as possible!` +
      `\n` +
      `\n` +
      `The class is going to be held by <b>${subject.tutor}</b> ${
        subject.type === "online lecture"
          ? "on the internet <b>online</b>"
          : `at <code>${subject.location}</code>`
      } \n`
    : `<b>⚠️ Upcoming Class Notification for ${group}</b> \n` +
      `\n` +
      `<b>An hour left</b> for <code>${subject.name} ${subject.type}</code> class. ` +
      `If you are studying offline, better you go now! There might be traffic jam or some events going on...` +
      `\n` +
      `\n` +
      `The class is going to be held by <b>${subject.tutor}</b> ${
        subject.type === "online lecture"
          ? "on the internet <b>online</b>"
          : `at <code>${subject.location}</code>`
      } \n`;

export const keyboard = (
  isTenMinuteLeft: boolean,
  link: string,
): InlineKeyboard =>
  isTenMinuteLeft
    ? new InlineKeyboard()
        .url("Check out the timetable", link)
        .row()
        .url(
          "Open the intranet for online",
          `https://intranet.wiut.uz/UserModuleMaterials`,
        )
    : new InlineKeyboard().url("Check out the timetable", link);
