import { Profanity } from "@2toad/profanity";

export class Censorship {
  protected profanity: Profanity;
  protected words = [
    "fuck",
    "fxck",
    "motherfucker",
    "mazafaka",
    "dumbass",
    "sex",
    "xxx",
    "ass",
    "tits",
    "boob",
    "boobs",
    "bastard",
    "dick",
    "asshole",
    "bitch",
    "damn",
    "cunt",
  ];

  constructor() {
    this.profanity = new Profanity();
    this.profanity.addWords(this.words);
  }

  clearLinks(message: string) {
    return message.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "");
  }

  clearProfanity(message: string) {
    return this.profanity.censor(message);
  }

  cleanAll(message: string) {
    return this.clearProfanity(this.clearLinks(message));
  }
}

export default Censorship;
