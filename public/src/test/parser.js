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
    ],
    [
      { type: 'lbrace', value: '{' },
      { type: 'string', value: '"a"' },
      { type: 'colon', value: ':' },
      { type: 'string', value: '"str"' },
      { type: 'string', value: '"b"' },
      { type: 'colon', value: ':' },
      { type: 'lbraket', value: '[' },
      { type: 'number', value: '912' },
      { type: 'lbraket', value: '[' },
      { type: 'number', value: '5656' },
      { type: 'number', value: '33' },
      { type: 'rbraket', value: ']' },
      { type: 'lbrace', value: '{' },
      { type: 'string', value: '"key"' },
      { type: 'colon', value: ':' },
      { type: 'string', value: '"innervalue"' },
      { type: 'string', value: '"newkeys"' },
      { type: 'colon', value: ':' },
      { type: 'lbraket', value: '[' },
      { type: 'number', value: '1' },
      { type: 'number', value: '2' },
      { type: 'number', value: '3' },
      { type: 'number', value: '4' },
      { type: 'number', value: '5' },
      { type: 'rbraket', value: ']' },
      { type: 'rbrace', value: '}' },
      { type: 'rbraket', value: ']' },
      { type: 'rbrace', value: '}' }
    ]
  ]
  
  tcs.forEach((tc, idx) => {
    console.log(`test${idx}`);
    console.log('input:', tc); // JSON.stringify(tc, null, ' '));
    console.log('output:', JSON.stringify(Parser.parse(tc).root.child[0], null, '  '));
  });
}

// test_getPartialTokens();
test_parse();