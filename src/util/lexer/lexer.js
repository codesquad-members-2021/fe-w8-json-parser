const isChildSeparator = (char) => {
  return "," === char;
}
const isKeyValueSeparator = (char) => {
  return ":" === char;
}

const isArrayObjectSeparator = (char) => {
  return ["[", "]", "{", "}"].includes(char);
}

const isString = (token) => {
  return `${token[0]}${token[token.length - 1]}` === '""';
}

const isNumber = (token) => { 
  return isNaN(Number(token)) === false;
}

const isPrimitive = (token) => {
  return ["null", "undefined", "true", "false"].includes(token);
}
  
const classifyPrimitive = (string) => {
  switch (string) {
    case "null":
      return { type: "null", value: null };
    case "undefined":
      return { type: "undefined", value: undefined };
    case "true":
      return { type: "boolean", value: true };
    case "false":
      return { type: "boolean", value: false };
  }
};

const classifyToken = (token) => {
  if (isString(token)) {
    return { type: "String", value: token };
  } else if (isChildSeparator(token)) {
    return { type: "Separator-child", value: token };
  }
  else if (isKeyValueSeparator(token)) {
    return { type: "Separator-key-value", value: token };
  }
  else if (isArrayObjectSeparator(token)) {
    return { type: "Separator-array-object", value: token };
  }
  else if (isNumber(token)) {
    return { type: "Number", value: Number(token) };
  } 
  else if (isPrimitive(token)) {
    return classifyPrimitive(token);
  } 
  else {
    return { type: "Object Key", value: token };
  }
};

const lexicalize = (tokenArray) => {
  const lexerArray = tokenArray.map((token) => {
    return classifyToken(token);
  });
  
  return lexerArray;
};

module.exports = lexicalize;