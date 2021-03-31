import '../scss/main.scss';
import tokenizer from './tokenizer.js';
import {lexer} from './lexer.js';
import {parse} from './parser.js';
import {_} from './utils/selctor.js';

function analysis() {
  const inputData = _.$('.left__data');
  const result = _.$(".right__result");
  const data = inputData.value;
  const tokens = tokenizer(data);
  const lexerTokens = lexer(tokens);
  const syntaxTree = parse(lexerTokens);
  result.innerText = 'syntaxTree:' + JSON.stringify(syntaxTree, null, '  ');
} 

function load() {  
  const submitBtn = _.$('.left__btn');
  submitBtn.addEventListener('click', analysis);
}
_.on(window, 'DOMContentLoaded', load);