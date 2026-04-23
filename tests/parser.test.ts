import { expect, test } from "bun:test";
import { parser } from "..";

// Rule: value = false / null / true / ...

test("true", () => {
  expect(parser("true")).toBe(true);
});

test("false", () => {
  expect(parser("false")).toBe(false);
});

test("null", () => {
  expect(parser("null")).toBe(null);
});

test("Test numbers", () => {
  expect(parser("20429899")).toBe(20429899);
  expect(parser("-2000040002")).toBe(-2000040002);
  expect(parser("-0")).toBe(-0);
});

test("TRUE", () => {
  expect(() => parser("TRUE")).toThrowError("Invalid token");
});

test("FALSE", () => {
  expect(() => parser("FALSE")).toThrowError("Invalid token");
});

test("Array", () => {
  expect(parser("[1,2,3]")).toBeArray();
});

test("Object", () => {
  expect(parser("{a:b}")).toBeObject();
});

test("hello world", () => {
  expect(parser('"hello world"')).toBe("hello world");
});
