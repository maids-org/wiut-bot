import { Markup } from "telegraf";

export const message = (isAdmin: boolean): string => {
  const base: string =
    `<b>List of available commands (⚠️ is undermaintanance):</b>` +
    `\n` +
    `\n` +
    `/help - <code>show this helper message</code>` +
    `\n` +
    `/stats - <code>check stats of group</code>` +
    `\n` +
    `/links - <code>show url links</code>` +
    `\n` +
    `/groups - <code>show group links</code>` +
    // `\n` +
    // `/unregister - <code>remove this group from our database</code>` +
    `\n` +
    `/revoke - <code>reset this group's link</code>` +
    `\n` +
    `/register - <code>register this group</code>` +
    `\n` +
    `⚠️ /intranet - <code>accessing intranet</code>` +
    `\n` +
    `/timetable - <code>today's timetable</code>` +
    `\n` +
    `/contribute - <code>enhance me more</code>` +
    `\n` +
    `/feedback - <code>leave a feedback to admins</code>`;

  const admin: string =
    `\n` +
    `\n` +
    `<b>Admin commands:</b>` +
    `\n` +
    `/add - <code>add temporary admin</code>` +
    `\n` +
    `/send - <code>send message to users</code>` +
    `\n` +
    `/reset - <code>reset temporary admin list</code>` +
    `\n` +
    `/list - <code>list temporary admins</code>` +
    `\n` +
    `/panel - <code>announce message to all groups</code>` +
    `\n` +
    `\n` +
    `<i>Be careful! Restricted for non-admin users.` +
    ` Heavily checked and database tested zone</i>`;
  if (isAdmin) return base + admin;
  else return base;
};

export const keyboard = Markup.inlineKeyboard([
  [Markup.urlButton("Announcement's Channel", "https://t.me/SeventyPlus")],
]);
