import fg from "fast-glob";
import { readFile } from "node:fs/promises";
import chalk from "chalk";
import { expect } from "../v2/lib.mjs";

const main = async () => {
  const root = process.cwd();
  const files = await fg("v1/tests/*.test.js", { absolute: true, root });
  for (const filepath of files) {
    const code = await readFile(filepath, "utf-8");
    try {
      eval(code);
      console.log(`${chalk.green.inverse.bold(" PASS ")}: ${filepath}`);
    } catch (e) {
      console.error(`${chalk.red.inverse.bold(" FAIL ")}: ${filepath}\n`, e);
    }
  }
};

main();
