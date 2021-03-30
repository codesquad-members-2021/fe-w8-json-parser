import tokenizer from '../Tokenizer.js';
import {lexer} from '../lexer.js';
import Stack from '../container/Stack.js';

const a = '["1a3", [null, false, ["11", [112233],{"easy" : ["hello", {"a":"a"}, "world"]}, 112], 55, "99"],{"a":"str", "b":[912, [5636,33], {"key":"innervalue", "newkeys":[1,2,3,4,5]}]}, true]';
const b = "[1]";
const root = [];

const preTokens = tokenizer(a);
const tokens = lexer(preTokens);

const bracketStack = new Stack();
let nodes = new Stack();


function arrayParser (tokens) {
    // type이 닫는괄호가 아니면 node 생성
    // 아직 부모노드의 생성이 끝나지 않았는데 child노드를 생성해서 붙여줄 수 있는가?

    // 시나리오 1
    // tokens 를 돌다가 [ or { 이 나오면 [ or { 오른쪽의 모든 문자열을 다시 tokens로 취급해,
    // 여는대괄호면 닫는대괄호가 나올때까지 arrayParser(tokens)를 실행
    // 여는중괄호면 닫는중괄호가 나올때까지 arrayParser(tokens)를 실행 
    // 기저조건: 오른쪽에 더이상 아무런 문자열이 없는 경우


    // 시나리오 2
    // tokens 를 돌다가 여는 대괄호를 만나면 array인덴트카운트 +1  그리고 여는 대괄호스택에 푸시
    //       ""       여는 중괄호를 만나면 object인덴트카운트 +1 그리고 여는 중괄호스택에 푸시
    //       ""       닫는 중(대)괄호를 만났을때, array인덴트카운트와 object인덴트카운트 중에 더 작은 카운트와 일치하면 하나의 객체, 혹은 배열이 끝난 것이다.
    let arrayIndent = {
        "cnt":0,
        "type":'arr'
    };
    let objectIndent = {
        "cnt":0,
        "type":'obj'
    };

    tokens.forEach(token => {
        if(token.type === 'lbraket') arrayIndent.arr++;
        if(token.type === 'lbrace') objectIndent++;
        if(token.type === 'rbraket' || token.type === 'rbrace') {
            const min = Math.min(arrayIndent.cnt, objectIndent.cnt);
            
        }
    })
    
}

class Node {
    constructor(token, idx) {
        this.type = this.getType(token.type);
        this.value = token.value;
        this.idx = idx;
        this.children = [];
    }

    getType(type) {
        let result = type;
        switch (type) {
            case 'lbrace':
                result = 'object';
                break;
            case 'lbraket':
                result = 'array';
                break;
        }
        return result;
    }

    hasChild(type) {
        if(type === 'lbraket' || type === 'lbrace') return true;
        else return false;
    }

    appendChild (type, node) {
        if(!this.hasChild(type)) return;
        return this.child = node;
    }
}


arrayParser(tokens);
console.log(root);