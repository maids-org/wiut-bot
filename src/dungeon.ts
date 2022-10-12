import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Admin, Group, OnlyId, OnlyModule } from "@type/dungeon";

export default class Dungeon {
  /**
   * Main client sdk.
   * @protected
   * @type SupabaseClient
   */
  protected client?: SupabaseClient;

  constructor(URL: string, KEY: string) {
    this.client = createClient(URL, KEY);
  }

  /**
   * Get all group data from the Dungeon.
   * @returns Promise<Group[]>
   */
  async getAll(): Promise<Group[]> {
    const { data: Groups, error } = await this.client
      .from("Groups")
      .select("*")
      .order("module")
      .range(0, 100);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups;
  }

  /**
   * Get all group data from the Dungeon with Pagination.
   * @returns Promise<Group[]>
   */
  async getAllByCursor(limit?: number, cursor?: number): Promise<Group[]> {
    const config = {
      limit: Number(limit) > 0 && Number(limit) <= 100 ? Number(limit) : 100,
      cursor: Number(cursor) > 0 ? Number(cursor) : 0,
    };

    const { data: Groups, error } = await this.client
      .from("Groups")
      .select("*")
      .order("module")
      .range(config.cursor, config.cursor + config.limit - 1);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups;
  }

  /**
   * Get all visible group data from the Dungeon with Pagination.
   * @returns Promise<Group[]>
   */
  async getAllVisibleByCursor(
    limit?: number,
    cursor?: number
  ): Promise<Group[]> {
    const config = {
      limit: Number(limit) > 0 && Number(limit) <= 100 ? Number(limit) : 100,
      cursor: Number(cursor) > 0 ? Number(cursor) : 0,
    };

    const { data: Groups, error } = await this.client
      .from("Groups")
      .select("*")
      .eq("show", true)
      .order("module")
      .range(config.cursor, config.cursor + config.limit - 1);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups;
  }

  /**
   * Get all group ID from the Dungeon.
   * @returns Promise<OnlyId[]>
   */
  async getAllID(): Promise<OnlyId[]> {
    const { data: Groups, error } = await this.client
      .from("Groups")
      .select("id")
      .order("id")
      .range(0, 100);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups;
  }

  /**
   * Fetches all available modules from the Dungeon.
   * @returns Promise<OnlyModule[]>
   */
  async getAllModule(): Promise<OnlyModule[]> {
    const { data: Groups, error } = await this.client
      .from("Groups")
      .select("module")
      .order("module")
      .range(0, 100);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups;
  }

  /**
   * Fetches a group by ID from the Dungeon.
   * @param id Telegram Chat ID of the group
   * @returns Promise<Group>
   */
  async getByID(id: number): Promise<Group> {
    const { data: Groups, error } = await this.client
      .from("Groups")
      .select("*")
      .eq("id", id);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups[0];
  }

  /**
   * Fetches a group by Module from the Dungeon.
   * @param module Module of the group that they have chosen
   * @returns Promise<Group>
   */
  async getByMod(module: string): Promise<Group> {
    const { data: Groups, error } = await this.client
      .from("Groups")
      .select("*")
      .eq("module", module);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups[0];
  }

  /**
   * Creates a new group in the Dungeon.
   * @param id The ID of the group chat
   * @param module Module of the group that they have chosen
   * @param link Link to the group chat
   * @returns Promise<Group[]>
   */
  async newGroup(id: number, module: string, link: string): Promise<Group[]> {
    const { data: Group, error } = await this.client
      .from("Groups")
      .insert([{ id, module, link, show: true }]);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Group;
  }

  /**
   * Deletes group chat from .
   * @param id The ID of the group chat
   * @returns Promise<Group[]>
   */
  async removeGroup(id: number): Promise<Group[]> {
    const { data: Group, error } = await this.client
      .from("Groups")
      .delete()
      .match({ id: id });

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Group;
  }

  /**
   * Revoke link of a group .
   * @param id The ID of the group chat
   * @param link New link for the group chat
   * @returns Promise<Group[]>
   */
  async updateLink(id: number, link: string): Promise<Group[]> {
    const { data: Group, error } = await this.client
      .from("Groups")
      .update({ link: link })
      .match({ id: id });

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Group;
  }

  /**
   * Get all admins telegram IDs from the Dungeon.
   * @returns Promise<OnlyId[]>
   */
  async getAllAdmins(): Promise<OnlyId[]> {
    const { data: Groups, error } = await this.client
      .from("Admins")
      .select("id")
      .order("id")
      .range(0, 100);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Groups;
  }

  /**
   * Register a new admin in to the Dungeon.
   * @param id The ID of the group chat
   * @returns Promise<Admin[]>
   */
  async newAdmin(id: number): Promise<Admin[]> {
    const { data: Admin, error } = await this.client
      .from("Admins")
      .insert([{ id }]);

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Admin;
  }

  /**
   * Deletes group chat from .
   * @param id The ID of the group chat
   * @returns Promise<Admin[]>
   */
  async removeAdmin(id: number): Promise<Admin[]> {
    const { data: Admin, error } = await this.client
      .from("Admins")
      .delete()
      .match({ id: id });

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Admin;
  }

  /**
   * Toggles the boolean "show" field.
   * @param id The ID of the group chat
   * @param show The show mode of the chat
   * @returns Promise<Admin[]>
   */
  async toggleShow(id: number, show: boolean): Promise<Group> {
    const { data: Group, error } = await this.client
      .from("Groups")
      .update({ show })
      .match({ id: id });

    if (error) throw new Error(`${error.message} (hint: ${error.hint})`);

    return Group[0];
  }
}
