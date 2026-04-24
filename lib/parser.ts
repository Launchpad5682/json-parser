// JSON.parse
function parser(input: string): Value {
  const bufferInput = Buffer.from(input);
  // UTF character comparison
  if (Buffer.from("true").equals(bufferInput)) {
    return true;
  } else if (Buffer.from("false").equals(bufferInput)) {
    return false;
  } else if (Buffer.from("null").equals(bufferInput)) {
    return null;
  } else if (!isNaN(Number(input))) {
    return Number(input);
  } else if (isNaN(Number(input)) && isString(input)) {
    return parseString(input);
  }
  // Parse Array and Objects Recursively
  else if (isArray(input)) {
    return parserArray(input);
  } else if (isObject(input)) {
    return parseObject(input);
  }
  throw new Error("Invalid token");
}

function isString(input: string): boolean {
  if (input.at(0) === '"' && input.at(-1) === '"') {
    return true;
  }
  return false;
}

function parseString(input: string): string {
  return input.slice(1, -1);
}

function isArray(input: string): boolean {
  if (input.at(0) === "[") {
    if (input.at(-1) === "]") return true;
    else throw Error(`Syntax Error: Expected "]" at ${input.length}.`);
  }

  return false;
}

function isObject(input: string): boolean {
  if (input.at(0) === "{" && input.at(-1) === "}") {
    return true;
  }
  return false;
}

function parserArray(input: string): any[] {
  const arr = [] as any[];

  const len = input.length - 1;
  let i = 1;

  while (i < len) {
    let element = input[i];

    // nested array
    if (element === "[") {
      const start = i;
      while (input[i] !== "]" && i < len - 1) {
        i++;
      }
      console.log("input nested", input[i]);

      if (input[i] !== "]") {
        throw new Error(`Syntax Error: Expected "]" at ${i}.`);
      }

      arr.push(parserArray(input.substring(start, i + 1)));

      i++;
    }

    // nested object

    // string
    if (element === '"') {
      i++;
      const start = i;
      while (input[i] !== '"') {
        i++;
      }
      arr.push(input.substring(start, i));
      i++;
    }
    // number
    else if (element === "-" || (element >= "0" && element <= "9")) {
      // NUMBER: accumulate until ',' or ']'
      const start = i;
      while (input[i] !== "," && input[i] !== "]") {
        i++;
      }
      arr.push(Number(input.slice(start, i)));
    }
    // delimiter
    else if (element === ",") i++;
  }

  return arr;
}

function parseObject(input: string): Record<any, unknown> {
  return {};
}

export { parser };
