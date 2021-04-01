import '../scss/style.scss';
import MainView from '../view/view';
import Lexer from './lexer';
import Parser from './parser';
import Tokenizer from './tokenizer';

// const inputData =
// '["1a3",["she\'s gone", null,false,["11",[112233],{"easy" : ["hel]lo", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]';

const inputData = '[1, 2, null, 3, "raccoon", [4, [ 5, true, 6], 7], 8, "luke"]';

const mainView = new MainView();
const tokenizer = new Tokenizer(inputData);
const lexer = new Lexer(tokenizer.getTokenList());
const parse = new Parser(lexer.getLexerList());
