import { InlineKeyboard } from "grammy";

export const message = `<b>Here are various groups for students:</b>`;

export const keyboard = new InlineKeyboard()
  .url("Announcement Channel", "https://t.me/madmaids")
  .row()
  .url("Anime focused chat group", "https://t.me/animeclubwest");
