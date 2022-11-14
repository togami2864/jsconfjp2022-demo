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
  const queue = [];
  function test(title, fn) {
    const task = {
      title,
      fn,
    };
    queue.push(task);
  }

  function collect() {
    context.currentSuite = suite;
    try {
      fn();
    } catch (e) {}
    return [...queue];
  }

  const suite = {
    title,
    test,
    queue,
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
