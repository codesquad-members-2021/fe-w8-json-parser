import { Type } from '../const.js';
import Queue from '../container/Queue.js';
import * as Parser from '../parser.js';

function test_getPartialTokens() {
  console.log('run test_getPartialTokens()');
  const tcs = [
    { rightType: Type.RBRAKET, tokenQueue: new Queue({ initialData: [
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
      ] })
    },
    { rightType: Type.RBRAKET, tokenQueue: new Queue({ initialData: [
        { type: Type.LBRAKET, value: '[' },
        { type: Type.LBRAKET, value: '[' },
        { type: Type.LBRAKET, value: '[' },
        { type: Type.RBRAKET, value: ']' },
        { type: Type.RBRAKET, value: ']' },
        { type: Type.RBRAKET, value: ']' },
        { type: Type.RBRAKET, value: ']' },
        'not reached'
      ] })
    },
    { rightType: Type.RBRACE, tokenQueue: new Queue({ initialData: [
        { type: Type.LBRACE, value: '{' },
        { type: Type.LBRACE, value: '{' },
        { type: Type.NUMBER, value: '123' },
        { type: Type.LBRACE, value: '{' },
        { type: Type.STRING, value: '\"abc\"' },
        { type: Type.RBRACE, value: '}' },
        { type: Type.RBRACE, value: '}' },
        { type: Type.RBRACE, value: '}' },
        { type: Type.RBRACE, value: '}' },
      ] })
    }
  ]

  tcs.forEach((tc, idx) => {
    console.log(`test${idx}`);
    console.log('input:', JSON.stringify(tc, null, ' '));
    console.log('output:', Parser.getPartialTokens(tc));
  });
}

function test_parse() {
  console.log('run test_parse()');
  const tcs = [
    [
      { type: Type.LBRACE, value: '{'},
      { type: Type.STRING, value: '\"a\"'},
      { type: Type.COLON, value: ':'},
      { type: Type.NUMBER, value: '1'},
      { type: Type.RBRACE, value: '}'},
    ],
    [
      { type: Type.LBRACE, value: '{'},
      { type: Type.STRING, value: '\"a\"'},
      { type: Type.COLON, value: ':'},
      { type: Type.NUMBER, value: '1'},
      { type: Type.STRING, value: '\"b\"'},
      { type: Type.COLON, value: ':'},
      { type: Type.NUMBER, value: '2'},
      { type: Type.RBRACE, value: '}'},
    ]
  ]
  
  tcs.forEach((tc, idx) => {
    console.log(`test${idx}`);
    console.log('input:', JSON.stringify(tc, null, ' '));
    console.log('output:', JSON.stringify(Parser.parse(tc).root.child[0], null, ' '));
  });
}

// test_getPartialTokens();
test_parse();

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