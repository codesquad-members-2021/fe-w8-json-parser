import { tokenize } from './tokenizer.js';
import { lex } from './lexer.js';

const makeTemplate = (type, value) => {
  return `
    {
      "value": ${value},
      "type": ${type},
    }
  `
}

const makeSeparatorTemplate = (value) => {
  switch(value) {
    case '[':
      return makeOpenBracketTemplate();

    case ']':
      return makeCloseBracketTemplate();

    case '{':
      return makeOpenBraceTemplate();

    case '}':
      return makeCloseBraceTemplate();

    case ':':
      return makeColonTemplate();

    case ',':
      return ','
  }
}

const parse = (lexedArr) => {
  return lexedArr.reduce((acc, {type, value}) => {
    switch(type) {
      case 'string':
      case 'number':
      case 'undefinded':
      case 'boolean':
        return acc + makeTemplate(type, value);

      case 'null':
        return acc + makeTemplate("object", value);
      
      case 'seperator':
        return acc + makeSeparatorTemplate(value);
    }
  }, '');
}