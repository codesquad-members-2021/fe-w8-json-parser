import { Type } from './const.js';
import Stack from './container/Stack.js';

export function lexer(tokens) {
  const resultTokens = [];

  tokens.forEach(token => {
    resultTokens.push(getLexerToken(token));
  });

  return resultTokens;
}

export function getLexerToken(token) {
  if (token === '[') return { type: Type.LBRAKET, value: token };
  if (token === ']') return { type: Type.RBRAKET, value: token };
  if (token === '{') return { type: Type.LBRACE, value: token };
  if (token === '}') return { type: Type.RBRACE, value: token };
  if (token === ':') return { type: Type.COLON, value: token };
  if (token[0] === '\"' && token[token.length - 1] === '\"') return { type: Type.STRING, value: token };
  if (token === 'true' || token === 'false') return { type: Type.BOOLEAN, value: Boolean(token) };
  if (token === 'null') return { type: Type.NULL, value: null };
  if (token !== '' && Number(token) !== NaN) return { type: Type.NUMBER, value: Number(token) };

  throw new Error(`Invalid argument, ${token}`);
}
