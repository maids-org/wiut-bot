import { Markup, Extra } from "telegraf";

// create a decorator that will be used to add a button to the message
export const button = (text: string, callback: () => void) =>
  Markup.callbackButton(text, JSON.stringify(callback));

export const Action = (target: Object, key: string) => {};

export const Command = () => {};
