export class Time {
  protected time: Date;
  protected uzbTime: Date;

  constructor() {
    this.time = new Date();
    this.uzbTime = new Date();
    this.uzbTime.setHours(this.time.getUTCHours() + 5);
  }

  updateTime(): void {
    this.time = new Date();
    this.uzbTime = new Date();
    this.uzbTime.setHours(this.time.getUTCHours() + 5);
  }

  getTime(): Date {
    return this.time;
  }

  getUzbTime(): Date {
    return this.uzbTime;
  }

  getTimeString(isTomorrow: boolean): string {
    switch (isTomorrow) {
      case false:
        return this.getTime().getDay().toString();
      case true:
        return (this.getTime().getDay() + 1).toString();
    }
  }

  getUzbTimeString(isTomorrow: boolean): string {
    switch (isTomorrow) {
      case false:
        return this.getUzbTime().getDay().toString();
      case true:
        return (this.getUzbTime().getDay() + 1).toString();
    }
  }
}

export default Time;