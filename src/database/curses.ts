import Filter from "@thisshu/bad-words";

const filter = new Filter();
const words = [
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

filter.addWords(words);
export default filter;
