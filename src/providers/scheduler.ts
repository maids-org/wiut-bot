import cron, { ScheduledTask } from "node-cron";

export class Scheduler {
  private schedules: ScheduledTask[] = [];

  constructor() {
    this.schedules = [];
  }

  public validate(input: string): boolean {
    return cron.validate(input);
  }

  public add(input: ScheduledTask) {
    this.schedules.push(input);
  }

  public start() {
    this.schedules.forEach((schedule) => schedule.start());
  }

  public stop() {
    this.schedules.forEach((schedule) => schedule.stop());
  }

  public clean() {
    this.schedules.forEach((task) => task.stop());
    this.schedules = [];
  }
}
