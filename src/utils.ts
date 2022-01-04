/**
 * Console Input Manager
 * @module layouts/consoles
 */

import { basename, dirname, sep } from "path";
import chalk = require("chalk");

export const errors = (error: Error): void => {
  console.log(chalk.red("[ERROR]"), error);
};

export const launch = (environment: string): void => {
  console.log("Bot has been started in " + environment + " environment");
};

export const wrongEnv = (): void => {
  console.log("Bot can't be started due to wrong environment!");
};

export const module = (filename: string = __filename): void => {
  const modules =
    dirname(filename).split(sep).pop() + "/" + basename(filename, ".js");
  console.log(chalk.blue("[MODULE]"), modules);
};
