export const expect = (received) => ({
  toBe: (expected) => {
    if (received !== expected) {
      throw new Error(`Expected ${expected} but received ${received}`);
    }
    return true;
  },
});

export const context = {
  suites: [],
  currentSuite: null,
};

export const suite = (title, fn) => {
  const cases = [];

  function test(title, fn) {
    const task = {
      title,
      fn,
    };
    cases.push(task);
  }

  function collect() {
    context.currentSuite = suite;
    try {
      fn();
    } catch (e) {}
    return [...cases];
  }

  const suite = {
    title,
    test,
    cases,
    collect,
  };
  context.suites.push(suite);
  return suite;
};

//alias
export const describe = suite;
export const it = (name, fn) => {
  context.currentSuite.test.call(this, name, fn);
};
