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
    for (const server of this.servers) {
      fetch(server).then((res) => {
        if (res.status === 200) {
          this.url = server;
        }
      });
    }

    if (this.url === null) {
      throw new Error("No active server found.");
    }
  }

  /**
   * Fetch RAW Data from the Dungeon.
   * @param anchor the rest part of the URL after domain without slash in the beginning.
   * @protected
   */
  protected getData(anchor = ""): Group | Groups | any {
    return fetch(this.url + anchor).then((res) => res.json());
  }

  /**
   * Sends data to the server using POST method.
   * @param anchor the rest part of the URL after domain without slash in the beginning.
   * @param object
   */
  protected postData(anchor = "", object: any): Group | Groups | any {
    return fetch(this.url + anchor, {
      method: "post",
      body: JSON.stringify(object),
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
  }

  /**
   * Get all group data from the Dungeon.
   * @returns Group[]
   */
  getAll(): Group[] {
    return this.getData("groups").results;
  }

  /**
   * Get all group ID from the Dungeon.
   * @returns Group[]
   */
  getAllID(): Group[] {
    return this.getData("groups/id").results;
  }

  /**
   * Fetches all available modules from the Dungeon.
   * @returns Group[]
   */
  getAllModule(): Group[] {
    return this.getData("groups/mod").results;
  }

  /**
   * Fetches a group by ID from the Dungeon.
   * @param id Telegram Chat ID of the group
   * @returns Group
   */
  getByID(id: number): Group | Groups {
    return this.getData(`groups/id/${id}`);
  }

  /**
   * Fetches a group by Module from the Dungeon.
   * @param mod Module of the group that they have chosen
   * @returns Group
   */
  getByMod(mod: string): Group | Groups {
    return this.getData(`groups/mod/${mod}`);
  }

  /**
   * Creates a new group in the Dungeon.
   * @param id The ID of the group chat
   * @param mod Module of the group that they have chosen
   * @param link Link to the group chat
   * @returns { msg: string, groups: Group[] }
   */
  newGroup(
    id: number,
    mod: string,
    link: string
  ): { msg: string; groups: Group[] } {
    return this.getData(`groups/new?id=${id}&module=${mod}&link=${link}`);
  }
}
