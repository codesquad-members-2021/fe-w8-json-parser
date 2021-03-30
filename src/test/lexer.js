import { Type } from '../const.js';
import * as Lexer from '../lexer.js';

function test_getDataType() {
  console.log('run test_getDataType()');
  console.log('boolean test1: ', Lexer.getType('true') === Type.BOOLEAN);
  console.log('boolean test2: ', Lexer.getType('false') === Type.BOOLEAN);
  console.log('number test1: ', Lexer.getType('1.1') === Type.NUMBER);
  console.log('number test2: ', Lexer.getType('100') === Type.NUMBER);
  console.log('number test3: ', Lexer.getType('-1') === Type.NUMBER);
  console.log('string test1: ', Lexer.getType('\"123\"') === Type.STRING);
  console.log('string test2: ', Lexer.getType('\"abc\"') === Type.STRING);
  console.log('array test1: ', Lexer.getType('[') === Type.ARRAY);
  console.log('object test1: ', Lexer.getType('{') === Type.OBJECT);
  console.log('null test1: ', Lexer.getType('null') === Type.OBJECT);
}

function test_lexer() {
  console.log(`run test_lexer()`);
  const tcs = [
    ['[', '\"a b c\"', '1.123', '34', '[', '\"12345\"', 'false', ']', 'null', 'true', ']', '{', '\"key\"', ':', '\"value\"', '}']
  ];

  tcs.forEach((tc, idx) => {
    console.log(`test${idx}`);
    console.log('input:', tc);
    console.log('output:', Lexer.lexer(tc));
  });
}

test_getDataType();
test_lexer();