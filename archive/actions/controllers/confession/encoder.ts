export default async function (id: number): Promise<string> {
  const reversed = id.toString().split("").reverse();
  for (let i = 1; i < reversed.length; i += 2) {
    reversed.splice(i, 0, `${Math.floor(Math.random() * 10)}`);
  }
  return reversed.join("");
}
