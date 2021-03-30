import { tokenize } from './tokenizer.js';

const lex = tokenArr => tokenArr.map((token) => makeObjTemplate(token, getType(token)))

const isString = (token) => {
  const strRegex = /^\".+\"$/;
  return strRegex.test(token);
}

const isSeperator = (token) => {
  const seperator = ["[", "]", "{", "}", ",", ":"];
  return seperator.includes(token);
}

const isNull = (token) => token === "null" || token === "NULL";

const isBoolean = (token) => token === "true" || token === "false";

const isUndefined = (token) => token === "undefined";

const isNumber = (token) => {
  const numRegex = /^\d+$/;
  return numRegex.test(token);
}

const getType = (token) => {
  if(isString(token)) return "string";
  if(isSeperator(token)) return "seperator";
  if(isNull(token)) return "null";
  if(isBoolean(token)) return "boolean";
  if(isUndefined(token)) return "undefined";
  if(isNumber(token)) return "number";
}

const makeObjTemplate = (token, type) => ({ type, value: token });


const test1 = `["a "," ",["c","d"],1,"]["]`

const test2 = `["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"]]`

const test3 = '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]'

console.log(lex(tokenize(test1)))
console.log(lex(tokenize(test3)))

export { lex }
