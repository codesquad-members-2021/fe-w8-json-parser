import {
   tokenizer
} from './tokenizer.js';
import {
   lexer
} from './lexer.js';

const test = '["\'"]'
// const test = '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]';

console.log(lexer(tokenizer(test)));
console.log(tokenizer(test))