import { DataType } from './const.js';
import Stack from './container/Stack.js';

export function lexer(tokens) {
  const stk = new Stack();

  tokens.forEach(token => {
    const type = getDataType(token);
    
  });
}

export function getDataType(token) {
  if (token === '[') return DataType.ARRAY;
  if (token === '{') return DataType.OBJECT;
  if (token[0] === '\"') return DataType.STRING;
  if (token === 'true' || token === 'false') return DataType.BOOLEAN;
  if (token === 'null') return DataType.OBJECT;
  return DataType.NUMBER;
}

/* test case

1) 
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