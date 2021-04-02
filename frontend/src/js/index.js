import JSONParser from './JSONParser/JSONParser.js';
import Tokenizer from './JSONParser/partial/Tokenizer.js';
import Lexer from './JSONParser/partial/Lexer.js';
import Parser from './JSONParser/partial/Parser.js';

const REFERENCE = {
    inputTextAreaSelector: '.json-container__input',
    resultTextAreaSelector: '.result-container__result__detail',
    analysisBtnSelector: '.json-container__btn',
    sampleWrapSelector: '.json-container__title__sample',
    resultSummarySelector: '.result-container__result__summary',
};

const parserModule = {
    tokenizer: new Tokenizer(),
    lexer: new Lexer(),
    parser: new Parser(),
};

new JSONParser(REFERENCE, parserModule).init();
