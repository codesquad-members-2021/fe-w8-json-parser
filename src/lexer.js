import { Type } from './const.js';
import Stack from './container/Stack.js';

export function lexer(tokens) {
  const resultTokens = [];

  tokens.forEach(token => {
    const type = getType(token);
    resultTokens.push({
      type,
      value: token
    });
  });

  return resultTokens;
}

export function getType(token) {
  if (token === '[') return Type.LBRAKET;
  if (token === ']') return Type.RBRAKET;
  if (token === '{') return Type.LBRACE;
  if (token === '}') return Type.RBRACE;
  if (token === ':') return Type.COLON;
  if (token[0] === '\"' && token[token.length - 1] === '\"') return Type.STRING;
  if (token === 'true' || token === 'false') return Type.BOOLEAN;
  if (token === 'null') return Type.NULL;
  if (token !== '' && Number(token) !== NaN) return Type.NUMBER;

  throw new Error(`Invalid argument, ${token}`);
}
