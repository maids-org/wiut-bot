import { join } from "path";
import * as fs from "fs";
import { Timetable as TT, Day } from "./types/database";

import Offline from "./provider/offline";

export const Online = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return await response.json();
};

export class Users {
  protected users: User[];
  protected admins: User[];
  protected banned: User[];
  protected database: Offline;

  constructor() {
    this.database = new Offline("users", {
      users: [],
    });

    if (this.database.read().users.length !== 0) {
      this.users = this.database.read().users.map((user: any) => {
        return new User(user);
      });
    } else {
      this.users = [];
    }

    this.admins = [];
    this.banned = [];

    this.users.forEach((user: User) => {
      if (user.admin) {
        this.admins.push(user);
      }
      if (user.banned) {
        this.banned.push(user);
      }
    });
  }

  addUser(user: User): void {
    // Check if user already exists
    if (this.users.find((u) => u.getId() === user.getId())) {
      throw new Error("User already exists");
    }

    // Add it to the storage
    this.users.push(user);
    this.database.write({
      users: this.users,
    });
  }

  deleteUser(user: User): void {
    // Check if user exists
    if (!this.users.find((u) => u.getId() === user.getId())) {
      throw new Error("User does not exist");
    }

    // Delete it from the storage
    this.users = this.users.filter((u) => u.getId() !== user.getId());
    this.database.write({
      users: this.users,
    });
  }

  getUser(id: number | string): User {
    return this.users.find((u) => u.getId() === id)!;
  }

  getUsers(): User[] {
    return this.users;
  }

  getAdmins(): User[] {
    return this.admins;
  }

  setAdmin(user: User, value: boolean): void {
    if (!this.users.find((u) => u.getId() === user.getId())) {
      throw new Error("User does not exist");
    }

    this.users.find((u) => u.getId() === user.getId())!.admin = value;

    value
      ? this.admins.push(user)
      : (this.admins = this.admins.filter((u) => u.getId() !== user.getId()));

    this.database.write({
      users: this.users,
    });
  }

  setBanned(user: User, value: boolean): void {
    if (!this.users.find((u) => u.getId() === user.getId())) {
      throw new Error("User does not exist");
    }

    this.users.find((u) => u.getId() === user.getId())!.banned = value;

    value
      ? this.banned.push(user)
      : (this.banned = this.banned.filter((u) => u.getId() !== user.getId()));

    this.database.write({
      users: this.users,
    });
  }
}
