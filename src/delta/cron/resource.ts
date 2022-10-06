import { Markup } from "telegraf";

export const message = (isTenMinuteLeft: boolean, subject, group) =>
  isTenMinuteLeft
    ? `<b>⚠️ Upcoming Class Notification for ${group}</b> \n` +
      `\n` +
      `<b>10 minutes left</b> for <code>${subject.name} ${subject.type}</code> class. ` +
      `Please, get ready as soon as possible!` +
      `\n` +
      `\n` +
      `It's up to you, whether you will you attend classes online on intranet or offline on campus. However, administration want you to attend classes offline.` +
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

export const keyboard = (isTenMinuteLeft: boolean, link: string) =>
  isTenMinuteLeft
    ? Markup.inlineKeyboard([
        [Markup.urlButton("Check out the timetable", link)],
        [
          Markup.urlButton(
            "Open the intranet for online",
            `https://intranet.wiut.uz/UserModuleMaterials`
          ),
        ],
      ])
    : Markup.inlineKeyboard([
        [Markup.urlButton("Check out the timetable", link)],
      ]);
