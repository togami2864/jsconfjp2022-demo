import fg from "fast-glob";
import chalk from "chalk";
import { context } from "./lib.mjs";

const runFile = (suite) => {
  const result = {
    title: suite.title,
    cases: [],
  };
  for (const task of suite.queue) {
    const r = {
      title: task.title,
      error: null,
    };
    try {
      task.fn();
    } catch (e) {
      r.error = e;
    }
    result.cases.push(r);
  }
  return result;
};

const main = async () => {
  const root = process.cwd();
  const files = await fg("v2/tests/*.test.js", { absolute: true, root });
  for (const filepath of files) {
    await import(filepath);
    for (const suite of context.suites) {
      await suite.collect();
      const results = runFile(suite);
      console.log(`\n${chalk.bold(results.title)}:${chalk.dim(filepath)}`);
      for (const r of results.cases) {
        if (r.error === null) {
          console.log(`  ${chalk.green.inverse.bold(" PASS ")} ${r.title}`);
        } else {
          console.error(
            `  ${chalk.red.inverse.bold(" FAIL ")}: ${r.title}\n`,
            r.error
          );
        }
      }
    }
  }
};

main();
