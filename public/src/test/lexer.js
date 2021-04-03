import { Type } from '../const.js';
import * as Lexer from '../lexer.js';

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

// test_getDataType();
test_lexer();