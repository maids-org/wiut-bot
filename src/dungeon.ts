import fetch from "node-fetch";
import { Group, Groups } from "@type/dungeon";

export default class Dungeon {
  /**
   * URL of the Dungeon Server.
   * @protected
   */
  protected url?: string | null = null;

  /**
   * List of all hosted servers.
   * @protected
   */
  protected servers?: string[] = [
    "https://maid-dungeon.vercel.app/",
    "https://dungeon.maid.uz/",
  ];

  constructor() {
    /**
     * Checks every server and sets active server.
     */
    // for (const server of this.servers) {
    //   fetch(server).then((res) => {
    //     if (res.status === 200) {
    //       this.url = server;
    //     }
    //   });
    // }
    this.url = this.servers[0];

    if (this.url === null) {
      throw new Error("No active server found.");
    }
  }

  /**
   * Fetch RAW Data from the Dungeon.
   * @param anchor the rest part of the URL after domain without slash in the beginning.
   * @protected
   */
  protected async getData(anchor = ""): Promise<Group | Groups | any> {
    const response = await fetch(this.url + anchor);
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
    const response = await fetch(this.url + anchor, {
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
   * Get all group ID from the Dungeon.
   * @returns Group[]
   */
  async getAllID(): Promise<Group[]> {
    const response = await this.getData("groups/id");
    return "results" in response ? response.results : null;
  }

  /**
   * Fetches all available modules from the Dungeon.
   * @returns Group[]
   */
  async getAllModule(): Promise<Group[]> {
    const response = await this.getData("groups/mod");
    return "results" in response ? response.results : null;
  }

  /**
   * Fetches a group by ID from the Dungeon.
   * @param id Telegram Chat ID of the group
   * @returns Group
   */
  async getByID(id: number): Promise<Group | Groups> {
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
  async getByMod(mod: string): Promise<Group | Groups> {
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
