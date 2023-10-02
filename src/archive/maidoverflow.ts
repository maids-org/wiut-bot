import { Search } from "@/archive/types/maidoverflow";

export default class Maidoverflow {
  protected base: string | null = "https://api.stackexchange.com";
  protected args: string | null = "/search/advanced?site=stackoverflow.com";

  /**
   * Search via Questions from Stackoverflow.
   * @param anchor question title that should be searched.
   * @public
   */
  public async search(anchor = ""): Promise<Search> {
    const response = await fetch(
      encodeURI(this.base! + this.args + "&q=" + anchor),
    );
    return await response.json();
  }
}
