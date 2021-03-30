import { Type } from '../const.js';
import * as Parser from '../parser.js';

function test_getPartialTokens() {
  console.log('run test_getPartialTokens()');
  const tcs = [
    { rightType: Type.RBRAKET, tokens: [
      { type: Type.NUMBER, value: 1 },
      { type: Type.NUMBER, value: 2 }, 
      { type: Type.NUMBER, value: 3 },
      { type: Type.NUMBER, value: 4 },
      { type: Type.LBRAKET, value: '[' },
      { type: Type.STRING, value: 'a' },
      { type: Type.STRING, value: 'b' },
      { type: Type.RBRAKET, value: ']' },
      { type: Type.RBRAKET, value: ']' },
      'not reached'
    ]},
    { rightType: Type.RBRAKET, tokens: [
      { type: Type.LBRAKET, value: '[' },
      { type: Type.LBRAKET, value: '[' },
      { type: Type.LBRAKET, value: '[' },
      { type: Type.RBRAKET, value: ']' },
      { type: Type.RBRAKET, value: ']' },
      { type: Type.RBRAKET, value: ']' },
      { type: Type.RBRAKET, value: ']' },
      'not reached'
    ]}
  ]

  tcs.forEach((tc, idx) => {
    console.log(`test${idx}`);
    console.log('input:', tc);
    console.log('output:', Parser.getPartialTokens(tc));
  });
}

test_getPartialTokens();

/*
input: ['[', '\"a b c\"', 1.123, 34, '[', \"12345\", false, ']', null, true, ']']
output: 
{
  "type": "array",
  "child": [
    {
      "value": "\"a b c\"",
      "type": "string",
    },
    {
      "value": 1.123,
      "type": "number",
    },
    {
      "value": 34,
      "type": "number"
    },
    {
      "type": "array",
      "child": [
        {
          "value": "\"12345\"",
          "type": "string",
        },
        {
          "value": false,
          "type": "boolean",
        }
      ]
    },
    {
      "value": null,
      "type": "object",
    },
    {
      "value": true,
      "type": "boolean",
    }
  ]
}
*/