import group from "@database/group";

export default async (chat: string | number): Promise<string> => {
  const groupNumber: number = parseInt((await group(chat)).toString()[0]);
  const baseUrl = "https://hub.maid.uz/t";
  switch (groupNumber) {
    case 4:
      return baseUrl + "/4BIS";
    case 5:
      return baseUrl + "/5BIS";
    default:
      return baseUrl;
  }
};
