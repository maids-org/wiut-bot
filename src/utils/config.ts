import { config } from "dotenv";
import * as process from "process";

const inits = () => {
  if (process.env["MODE"] === "NOFS") {
    return process.env;
  } else {
    return config();
  }
};

const dots = inits();

export default dots;