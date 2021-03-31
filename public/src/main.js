import '../scss/main.scss';
import tokenizer from './tokenizer.js';
import {lexer} from './lexer.js';
import {parse} from './parser.js';
import {_} from './utils/selctor.js';

function analysis() {
  const inputData = _.$('.left__data');
  const print = _.$(".right__result");
  const data = inputData.value;
  const tokens = tokenizer(data);
  const lexerTokens = lexer(tokens);
  const syntaxTree = parse(lexerTokens);
  const result = 'syntaxTree:' + JSON.stringify(syntaxTree, null, '  ');
  print.innerText = result;
  console.log(result);
} 

function load() {  
  const submitBtn = _.$('.left__btn');
  submitBtn.addEventListener('click', analysis);
}
_.on(window, 'DOMContentLoaded', load);