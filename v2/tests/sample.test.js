import { it, describe, expect } from "../lib.mjs";

describe("1. simple test cases", () => {
  it("case1", () => {
    expect("foo").toBe("foo");
  });
  it("case2", () => {
    expect("the future rules!").toBe("the future rules!");
  });
});

describe("2. of course, work as intended!!", () => {
  it("case3", () => {
    expect(parseInt(0.000005)).toBe(0);
  });
  it("case4", () => {
    expect(parseInt(0.0000005)).toBe(5);
  });
});

describe("3. failure cases", () => {
  it("case5", () => {
    expect("apple").toBe("banana");
  });
  it("case6", () => {
    expect(0.1 + 0.2 === 0.3).toBe(true);
  });
});
