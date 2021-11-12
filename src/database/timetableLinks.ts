import fetch from "node-fetch";

export default async (chat: string | number): Promise<string> => {
  const data = await fetch(
    `https://maid-dungeon.vercel.app/groups/id/${chat}`
  ).then((res) => res.json());
  const chatString = data.module;
  const course = chatString.match(/([0-9]+)([A-Z]+)([0-9]+)/);
  const baseUrl = "https://hub.maid.uz/t/";
  return baseUrl + course[1] + course[2];
};
