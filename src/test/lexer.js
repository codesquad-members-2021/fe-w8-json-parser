import { DataType } from '../const.js';
import * as Lexer from '../lexer.js';

function test_getDataType() {
  console.log('run test_getDataType()');
  console.log('boolean test1: ', Lexer.getDataType('true') === DataType.BOOLEAN);
  console.log('boolean test2: ', Lexer.getDataType('false') === DataType.BOOLEAN);
  console.log('number test1: ', Lexer.getDataType('1.1') === DataType.NUMBER);
  console.log('number test2: ', Lexer.getDataType('100') === DataType.NUMBER);
  console.log('number test3: ', Lexer.getDataType('-1') === DataType.NUMBER);
  console.log('string test1: ', Lexer.getDataType('\"123\"') === DataType.STRING);
  console.log('string test2: ', Lexer.getDataType('\"abc\"') === DataType.STRING);
  console.log('array test1: ', Lexer.getDataType('[') === DataType.ARRAY);
  console.log('object test1: ', Lexer.getDataType('{') === DataType.OBJECT);
  console.log('null test1: ', Lexer.getDataType('null') === DataType.OBJECT);
}

test_getDataType();