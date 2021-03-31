import '../scss/main.scss';
import tokenizer from './tokenizer.js';
import {lexer} from './lexer.js';
import {parse} from './parser.js';

function analysis() {
  const inputData = document.querySelector('.left__data');
  const result = document.querySelector(".right__result");
  const data = inputData.value;
  const tokens = tokenizer(data);
  const lexerTokens = lexer(tokens);
  const syntaxTree = parse(lexerTokens);
  result.innerText = 'syntaxTree:' + JSON.stringify(syntaxTree, null, '  ');
} 

function load() {  
  const submitBtn = document.querySelector('.left__btn');
  submitBtn.addEventListener('click', analysis);
}

window.addEventListener('DOMContentLoaded', load);