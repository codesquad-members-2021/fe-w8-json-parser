import tokenizer from '../Tokenizer.js'
import { lexer } from '../lexer.js';
import { parse } from '../parser.js';

const tcs = [
  '["1 2 3", 23, true, null, {"key":false}, "234ho"]',
  '["1 2, 3", 23, true, null, {"key":3.214}, [{"key1":false,"key2": 2.234},{"key3":23}], "234h,o"]',
  '["1a3", [null, false, ["11", [112233],{"easy" : ["hello", {"a":"a"}, "world"]}, 112], 55, "99"],{"a":"str", "b":[912, [5636,33], {"key":"innervalue", "newkeys":[1,2,3,4,5]}]}, true, false, "true", "false"]',
  '{"a":"str","b":[912, [5656, 33],{"key" : "innervalue","newkeys": [1,2,3,4,5]}]}',
];

tcs.forEach((tc, idx) => {
  console.log('test', idx);
  console.log('input:', tc);
  const tokens = tokenizer(tc);
  console.log('tokens:', JSON.stringify(tokens));
  const lexerTokens = lexer(tokens);
  console.log('lexerTokens:', lexerTokens);
  const syntaxTree = parse(lexerTokens);
  console.log('syntaxTree:', JSON.stringify(syntaxTree, null, '  '));
});