import { Tokenizer } from './tokenizer.js';

class Lexer {
  constructor(tokenArr) {
    // this.tokenArr = tokenArr;
    this.lexedArr = tokenArr.map(this.lex.bind(this));
  }

	lex(token) {
    return this.makeObjTemplate(token, this.getType(token));
	}
	
	isString(token) {
		const strRegex = /^\".+\"$/;
		return strRegex.test(token);
	}

	isSeperator(token) {
    const seperator = ["[", "]", "{", "}", ",", ":"];
    return seperator.includes(token);
	}

  isNull(token) {
    return token === "null";
  }

  isBoolean(token) {
    return token === "true" || token === "false";
  }

  isUndefined(token) {
    return token === "undefined";
  }

  isNumber(token) {
    const numRegex = /^\d+$/;
    return numRegex.test(token);
  }

  getType(token) {
    if(this.isString(token)) return "string";
    if(this.isSeperator(token)) return "seperator";
    if(this.isNull(token)) return "null";
    if(this.isBoolean(token)) return "boolean";
    if(this.isUndefined(token)) return "undefined";
    if(this.isNumber(token)) return "number";
  }

  makeObjTemplate(token, type) {
    return {
      type,
      value: token,
    }
  }

  getLexer() {
    return this.lexedArr
  }
}


const test1 = `["a "," ",["c","d"],1,"]["]`

const test2 = `["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"]]`

const test3 = '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]'

const tokenizer = new Tokenizer(test1);
const lexer = new Lexer(tokenizer.getToken());
console.log(lexer.getLexer());
