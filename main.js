import { tokenize } from './tokenizer.js';
import { lex } from './lexer.js';
import { parse } from './parser.js';

const test1 = `["a "," ",["c","d"],1,"]["]`

const test2 = `["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"]]`

const test3 = '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]'

console.log(lex(tokenize(test2)))
const please = parse(lex(tokenize(test2)))
console.log(JSON.stringify(please, null, '  '))
