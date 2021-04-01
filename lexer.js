import * as v from "./variables.js"

const lex = tokenArr => tokenArr.map((token) => makeObjTemplate(token, getType(token)))

const isString = (token) => {
  const strRegex = /^\".+\"$/;
  return strRegex.test(token);
}

const isSeparator = (token) => {
  return v.separator.includes(token);
}

const isNull = (token) => token === "null";

const isBoolean = (token) => token === "true" || token === "false";

const isUndefined = (token) => token === "undefined";

const isNumber = (token) => {
  const numRegex = /^\d+$/;
  return numRegex.test(token);
}

const getType = (token) => {
  if(isString(token)) return "string";
  if(isSeparator(token)) return "separator";
  if(isNull(token)) return "null";
  if(isBoolean(token)) return "boolean";
  if(isUndefined(token)) return "undefined";
  if(isNumber(token)) return "number";
}

const makeObjTemplate = (token, type) => ({ type, value: token });

export { lex }
