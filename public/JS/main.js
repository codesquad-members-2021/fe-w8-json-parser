import { tokenize } from './tokenizer.js';
import { lex } from './lexer.js';
import { parse, countNumber, countString, countDepth } from './parser.js';
import * as _ from './util.js';

const $inputText = _.$('.input__text');
const $inputBtn = _.$('.input__btn');
const $jsonTree = _.$('.json-tree');

$inputBtn.addEventListener('click', () => {
  const lexedArr = _.pipe(tokenize, lex)($inputText.value)
  $jsonTree.innerHTML = `<pre>${JSON.stringify(parse([...lexedArr]), null, '  ')}</pre>`;
  $jsonTree.innerHTML += `<br> 배열 중첩 수준:${countDepth(lexedArr)}단계`
  $jsonTree.innerHTML += `<br> 문자열 타입 갯수 ${countString(lexedArr)}개`
  $jsonTree.innerHTML += `<br> 숫자 타입 갯수 ${countNumber(lexedArr)}개`
})