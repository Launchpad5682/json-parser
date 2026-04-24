// JSON.parse
function parser(rawInput: string): Value {
  const input = rawInput.trim();
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

// array handling
function isArray(input: string): boolean {
  if (input.at(0) === "[") {
    if (input.at(-1) === "]") return true;
    else throw Error(`Syntax Error: Expected "]" at ${input.length}.`);
  }

  return false;
}

function processArray(
  input: string,
  index: number,
  originalLength: number,
): { start: number; end: number } {
  const start = index;
  while (input[index] !== "]" && index < originalLength - 1) {
    index++;
  }
  console.log("input nested", input[index]);

  if (input[index] !== "]") {
    throw new Error(`Syntax Error: Expected "]" at ${index}.`);
  }

  return { start, end: index };
}

function processString(
  input: string,
  index: number,
  originalLength: number,
): {
  start: number;
  end: number;
} {
  index++;
  const start = index;
  while (input[index] !== '"') {
    index++;
  }

  return { start, end: index };
}

function parserArray(input: string): any[] {
  const arr = [] as any[];

  const len = input.length - 1;
  let i = 1;

  while (i < len) {
    let element = input[i];

    // nested array
    if (element === "[") {
      const { start, end } = processArray(input, i, len);

      arr.push(parserArray(input.substring(start, end + 1)));

      i = end + 1;
    }

    // nested object
    // true, false, null
    // string
    if (element === '"') {
      const { start, end } = processString(input, i, len);
      arr.push(input.substring(start, end));
      i = end + 1;
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

// object handling
function isObject(input: string): boolean {
  if (input.at(0) === "{") {
    if (input.at(-1) === "}") return true;
    else throw Error(`Syntax Error: Expected "}" at ${input.length}.`);
  }
  return false;
}

function parseObject(input: string): Record<string, unknown> {
  const obj = {};
  const len = input.length - 1;
  let i = 1;
  while (i < len) {
    let element = input[i];
    console.log("element", element);
    let key: string, value;
    if ((element = '"')) {
      const { start, end } = processString(input, i, len);
      key = input.substring(start, end);
      console.log("key", key);
      i = end + 1;
    }
    if (!key) {
      throw new Error("Fuck you, give me valid object.");
    }
    if (input[i] === ":") {
      i++;
    }
    // process value now
    if (input[i] === "-" || (input[i] >= "0" && input[i] <= "9")) {
      // NUMBER: accumulate until ',' or ']'
      const start = i;
      while (input[i] !== "," && input[i] !== "}") {
        i++;
      }
      value = Number(input.slice(start, i));
      console.log("value", value);
    }
    if (input[i] === ",") i++;

    obj[key] = value;
  }
  return obj;
}

export { parser };
