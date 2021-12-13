import { Markup } from "telegraf";

export const message = (subject) =>
  `<b>⚠️ Upcoming Class Notification</b> \n` +
  `\n` +
  `<b>10 minutes left</b> for <code>${subject.name} ${subject.type}</code> class. ` +
  `Please, get ready as soon as possible!` +
  `\n` +
  `\n` +
  `You should attend the seminars on-campus and lectures online.` +
  `\n` +
  `\n` +
  `The class is going to be held by <b>${subject.tutor}</b> ${
    subject.type === "online"
      ? "on the internet <b>online</b>"
      : `at <code>${subject.location}</code>`
  } \n`;

export const keyboard = (link) =>
  Markup.inlineKeyboard([[Markup.urlButton("Check out the timetable", link)]]);
