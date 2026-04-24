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

test("Object", () => {
  expect(parser("{a:b}")).toBeObject();
});

test("hello world", () => {
  expect(parser('"hello world"')).toBe("hello world");
});

// OBJECT
// noraml array
test("String/Character Array", () => {
  // toEqual is deep equality check
  expect(parser('["a","c","d","hello, world"]')).toEqual([
    "a",
    "c",
    "d",
    "hello, world",
  ]);
});

test("Array", () => {
  expect(parser("[1,2,3]")).toEqual([1, 2, 3]);
});

test("Invalid Array", () => {
  expect(() => parser("[1,2,3")).toThrowError(
    'Syntax Error: Expected "]" at 6.',
  );
});

// Nested Array
test("Nested Array", () => {
  expect(parser('[["a","b",3,"c"]]')).toEqual([["a", "b", 3, "c"]]);
});

test("Invalid Nested Array", () => {
  expect(() => parser('[["a","b",3,"c"]')).toThrowError(
    'Syntax Error: Expected "]" at 14.',
  );
});

test("Object", () => {
  expect(
    parser(
      '{"name":"Alice","age":28,"active":true,"score":-5,"data":null,"city":"NYC"}',
    ),
  ).toEqual({
    name: "Alice",
    age: 28,
    active: true,
    score: -5,
    data: null,
    city: "NYC",
  });
});

// // Nested Object
// test("Nested Object", () => {
//   expect(parser('{"a":1,"b":["a","b",3],"c":52}')).toBe({
//     a: 1,
//     b: ["a", "b", 3],
//     c: 52,
//   });
// });
