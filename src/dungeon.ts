import fetch from "node-fetch";

interface GroupOption {
  limit: number;
  cursor: number;
  search: null | string;
}

interface Group {
  id?: number;
  module?: string;
  link?: string;
}

interface Groups {
  options?: GroupOption;
  results: Group[];
}

interface RequestByObject {}

export class Dungeon {
  protected selectServer(): string {
    const server1 = "https://dungeon.maid.uz/";
    const server2 = "https://maid-dungeon.vercel.app/";

    if (fetch(server1).then((res) => res.status) === 200) {
      return server1;
    }
    if (fetch(server2).then((res) => res.status) === 200) {
      return server2;
    }
    return process.env.DUNGEON_SERVER;
  }

  /**
   * URL of the Dungeon Server.
   */
  protected url?: string = this.selectServer();

  /**
   * Fetch RAW Data from the Dungeon.
   */
  protected async getData(url: string): Promise<Groups | Group> {
    const response = await fetch(url);
    return await response.json();
  }

  /**
   * Get all group data from the Dungeon.
   */
  async getAll(): Promise<any> {
    const response = await this.getData(`${this.url}/groups`);
    return "results" in response ? response.results : null;
  }

  /**
   * Get all group ID from the Dungeon.
   */
  async getAllID(): Promise<any> {
    const response = await this.getData(`${this.url}/groups/id`);
    return "results" in response ? response.results : null;
  }
}
