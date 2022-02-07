import { Markup } from "telegraf";

export const message = (subject, group) =>
  `<b>⚠️ Upcoming Class Notification for ${group}</b> \n` +
  `\n` +
  `<b>10 minutes left</b> for <code>${subject.name} ${subject.type}</code> class. ` +
  `Please, get ready as soon as possible!` +
  `\n` +
  `\n` +
  `You should attend the seminars on-campus or online.` +
  `\n` +
  `\n` +
  `The class is going to be held by <b>${subject.tutor}</b> ${
    subject.type === "online"
      ? "on the internet <b>online</b>"
      : `at <code>${subject.location}</code>`
  } \n`;

export const keyboard = (link) =>
  Markup.inlineKeyboard([
    [Markup.urlButton("Check out the timetable", link)],
    [
      Markup.urlButton(
        "Open the intranet for online",
        `https://intranet.wiut.uz/UserModuleMaterials`
      ),
    ],
  ]);
