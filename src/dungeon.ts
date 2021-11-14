import fetch from "node-fetch";

interface Option {
  limit: number;
  cursor: number;
  search: null | string;
}

interface Group {
  id?: number;
  module?: string;
  link?: string;
}

// TODO: Add more types by object
// interface GroupById {}
// interface GroupByModule {}

interface Groups {
  options?: Option;
  results: Group[];
}

export class Dungeon {
  /**
   * URL of the Dungeon Server.
   */
  protected url?: string | null = null;
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
          return;
        }
      });
    }

    if (this.url === null) {
      throw new Error("No active server found.");
    }
  }

  /**
   * Fetch RAW Data from the Dungeon.
   */
  protected async getData(anchor: string = ""): Promise<Group | Groups> {
    const response = await fetch(this.url + anchor);
    return await response.json();
  }

  protected async postData(object): Promise<Group | Groups> {
    const response = await fetch();
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
    return await this.getData(`groups/id/${id}`);
  }

  /**
   * Fetches a group by Module from the Dungeon.
   * @param mod Module of the group that they have chosen
   * @returns Group
   */
  async getByMod(mod: string): Promise<Group | Groups> {
    return await this.getData(`groups/mod/${mod}`);
  }

  async newGroup() {}
}
