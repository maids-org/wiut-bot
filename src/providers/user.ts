export class User {
  protected _id: number | string;
  protected messages: string[];
  protected photos: (string | Buffer)[];
  protected _admin: boolean;
  protected _banned: boolean;

  constructor(data?: number | any) {
    if (typeof data === "number") {
      this._id = data;
      this.messages = [];
      this.photos = [];
      this._admin = false;
      this._banned = false;
    } else if (typeof data === "object") {
      this._id = data._id;
      this.messages = data.messages;
      this.photos = data.photos;
      this._admin = data._admin;
      this._banned = data._banned;
    } else throw new Error("Invalid data type");
  }

  set id(id: number | string) {
    this._id = id;
  }

  get id(): number | string {
    return this._id;
  }

  set admin(value: boolean) {
    this._admin = value;
  }

  get admin(): boolean {
    return this._admin;
  }

  set banned(value: boolean) {
    this._banned = value;
  }

  get banned(): boolean {
    return this._banned;
  }

  addMessage(message: string): void {
    this.messages.push(message);
  }

  getMessage(index: number): string {
    return this.messages[index];
  }

  getMessages(): string {
    return this.messages.join("\n");
  }

  resetMessages(): void {
    this.messages = [];
  }

  addPhoto(photo: string | Buffer): void {
    this.photos.push(photo);
  }

  getPhoto(index: number): string | Buffer {
    return this.photos[index];
  }

  getPhotos(): (string | Buffer)[] {
    return this.photos;
  }

  resetPhotos(): void {
    this.photos = [];
  }

  getId(): number | string {
    return this.id;
  }
}