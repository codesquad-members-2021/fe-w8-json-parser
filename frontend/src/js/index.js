import JSONParser from "./JSONParser/JSONParser.js";
import Tokenizer from './partial/Tokenizer.js';
import Lexer from './partial/Lexer.js';
import Parser from './partial/Parser.js';

const REFERENCE = {
    inputTextAreaSelector: '.json-container__input',
    resultTextAreaSelector: '.result-container__result__detail',
    analysisBtnSelector: '.json-container__btn',
};

const parserModule = {
    tokenizer: new Tokenizer(),
    lexer: new Lexer(),
    parser: new Parser(),
};

new JSONParser(REFERENCE, parserModule).init();