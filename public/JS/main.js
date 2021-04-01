import { tokenize } from './tokenizer.js';
import { lex } from './lexer.js';
import { parse } from './parser.js';
import * as _ from './util.js';

const $inputText = _.$('.input__text');
const $inputBtn = _.$('.input__btn');
const $jsonTree = _.$('.json-tree');

$inputBtn.addEventListener('click', () => {
  $jsonTree.innerHTML = `<pre>${JSON.stringify(_.pipe(tokenize, lex, parse)($inputText.value), null, '  ')}</pre>`;
})