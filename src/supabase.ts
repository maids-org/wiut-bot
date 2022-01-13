import fetch from "node-fetch";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Group, Groups, AllModule, AllId } from "@type/dungeon";

export default class Dungeon {
  /**
   * Main client sdk.
   * @protected
   */
  protected client?: SupabaseClient;

  constructor(URL: string, KEY: string) {
    this.client = createClient(URL, KEY);
  }

  /**
   * Fetch RAW Data from the Dungeon.
   * @param anchor the rest part of the URL after domain without slash in the beginning.
   * @protected
   */
  protected async getData(anchor = ""): Promise<Group | Groups | any> {
    const response = await fetch(encodeURI(this.url + anchor));
    return await response.json();
  }

  /**
   * Sends data to the server using POST method.
   * @param anchor the rest part of the URL after domain without slash in the beginning.
   * @param object
   */
  protected async postData(
    anchor = "",
    object: any
  ): Promise<Group | Groups | any> {
    const response = await fetch(encodeURI(this.url + anchor), {
      method: "post",
      body: JSON.stringify(object),
      headers: { "Content-Type": "application/json" },
    });
    return await response.json();
  }

  /**
   * Get all group data from the Dungeon.
   * @returns Group[]
   */
  async getAll(): Promise<Group[]> {
    const response = await this.getData("groups");
    return "results" in response ? response.results : null;
  }

  /**
   * Get all group data from the Dungeon with Pagination.
   * @returns Group[]
   */
  async getAllByCursor(cursor = 0): Promise<Group[]> {
    const response = await this.getData(`groups?cursor=${cursor}&limit=10`);
    return "results" in response ? response.results : null;
  }

  /**
   * Get all group ID from the Dungeon.
   * @returns Group[]
   */
  async getAllID(): Promise<AllId[]> {
    const response = await this.getData("groups/id");
    return "results" in response ? response.results : null;
  }

  /**
   * Fetches all available modules from the Dungeon.
   * @returns Group[]
   */
  async getAllModule(): Promise<AllModule[]> {
    const response = await this.getData("groups/mod");
    return "results" in response ? response.results : null;
  }

  /**
   * Fetches a group by ID from the Dungeon.
   * @param id Telegram Chat ID of the group
   * @returns Group
   */
  async getByID(id: number): Promise<Group> {
    try {
      return await this.getData(`groups/id/${id}`);
    } catch (error) {
      return null;
    }
  }

  /**
   * Fetches a group by Module from the Dungeon.
   * @param mod Module of the group that they have chosen
   * @returns Group
   */
  async getByMod(mod: string): Promise<Group> {
    try {
      return await this.getData(`groups/mod/${mod}`);
    } catch (error) {
      return null;
    }
  }

  async parse(group: string | number): Promise<string | number> {
    if (typeof group === "string") {
      const groupID = await this.getByMod(group);
      if (groupID === null) {
        throw new Error("Group not found.");
      }
      return "id" in groupID ? groupID.id : null;
    } else if (typeof group === "number") {
      const groupID = await this.getByID(group);
      if (groupID === null) {
        throw new Error("Group not found.");
      }
      return "id" in groupID ? groupID.id : null;
    } else {
      throw new Error("Invalid group type.");
    }
  }

  /**
   * Creates a new group in the Dungeon.
   * @param id The ID of the group chat
   * @param mod Module of the group that they have chosen
   * @param link Link to the group chat
   * @returns { msg: string, groups: Group[] }
   */
  async newGroup(
    id: number,
    mod: string,
    link: string
  ): Promise<{ msg: string; groups: Group[] }> {
    return await this.getData(`groups/new?id=${id}&module=${mod}&link=${link}`);
  }
}
