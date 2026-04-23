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
    return [];
  } else if (isObject(input)) {
    return {};
  }
  throw new Error("Invalid token");
}

function isNumber(input: string): boolean {
  let isNumber = true;

  input.split("").forEach((value, index) => {
    if ((value <= "0" && value >= "9") || (index !== 0 && value === "-")) {
      isNumber = false;
    }
  });
  return isNumber;
}

function parseNumber(input: string): number {
  let num = 0;
  input
    .split("")
    .reverse()
    .forEach((value, index) => {
      num += Number(value) * 10 ** index;
    });
  return num;
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
  if (input.at(0) === "[" && input.at(-1) === "]") {
    return true;
  }

  return false;
}

function isObject(input: string): boolean {
  if (input.at(0) === "{" && input.at(-1) === "}") {
    return true;
  }
  return false;
}

export { parser };
