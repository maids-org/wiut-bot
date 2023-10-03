import {
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";
import { Context } from "grammy";

export type MaidContext = Context & ConversationFlavor;
export type MaidConversation = Conversation<MaidContext>;
export type Parser = {
  [key: string]: RegExp;
};
