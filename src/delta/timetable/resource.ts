import { Markup } from "telegraf";

export const message = async (
  dungeon,
  ctx,
  timetable,
  day,
  isEdited,
  isTomorrow,
) => {
  let text = `<b>⛓ ${isTomorrow ? "Tomorrow" : "Today"}'s Timetable for ${
    (await dungeon.getByID(ctx.chat.id)).module
  } ⛓</b>`;

  for (const subject of timetable.getDayLessons(parseInt(day))) {
    const subText =
      `\n` +
      `\n` +
      `<b>💠 Name:</b> <i>${subject.name}</i> \n` +
      `<b>🌀 Type:</b> <i>${subject.type}</i> \n` +
      `<b>👨‍💻 Tutor:</b> <i>${subject.tutor}</i> \n` +
      `<b>⏰ Time (start-end):</b> <code>${subject.start}-${
        subject.start + subject.length
      }</code> \n` +
      `<b>📍 Location:</b> <i>${subject.location}</i>`;

    text += subText;
  }

  if (timetable.getDayLessons(parseInt(day))[0] === undefined) {
    text +=
      `\n` +
      `\n` +
      `<b>🎉 Feel free to enjoy today, you don't have any classes!</b>`;
  }

  if (isEdited) {
    const refreshTime = new Date(
      new Date().getTime() +
        new Date().getTimezoneOffset() * 60000 +
        3600000 * 5,
    )
      .toString()
      .replace("GMT+0000 (Coordinated Universal Time)", "")
      .replace("GMT+0500 (Uzbekistan Standard Time)", "");

    const editTime =
      `\n` +
      `\n` +
      `<b>Last Refresh:</b> <code>${
        refreshTime + (await identifier(5))
      }</code>`;

    text += editTime;
  }

  const editString =
    `\n` +
    `\n` +
    `<b>⚠ If you found mistake, please take consider correcting</b> <a href="${timetable.getTimetableEditLink()}">timetable</a> <b>of your own group in our repository!</b>`;

  text += editString;
  return text;
};

export const keyboard = async (timetable, day, isTomorrow) =>
  Markup.inlineKeyboard([
    !isTomorrow ? [Markup.callbackButton(`🔁 Refresh`, `timetable`)] : [],
    !isTomorrow
      ? [Markup.callbackButton(`⌚ Tomorrow`, `tomorrow_${day}`)]
      : [],
    isTomorrow ? [Markup.callbackButton(`◀ Back`, `timetable`)] : [],
    [Markup.urlButton(`🕸 Webtable`, `${timetable.getTimetableLink()}`)],
  ]);

export const identifier = async (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result.toUpperCase();
};
