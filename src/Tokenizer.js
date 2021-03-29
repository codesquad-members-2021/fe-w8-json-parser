import Stack from './container/Stack.js';

function tokenizer(str) {

    const tokens = new Stack();
    let curStr = '';
    let curNum = '';
    let curBool = '';
    let strFlag = false;
    let numFlag = false;
    let booleanFlag = false;
    let nullFlag = false;

    const bracketRegex = /(\[|\])|(\(|\))|(\{|\})/;
    const numRegex = /[0-9|.]/;


    for (let i = 0; i < str.length; i++) {

        if(str[i] === '"') {
            strFlag = !strFlag; 
        }

        // 따옴표 내부가 아니라면
        if (!strFlag) {
            if (curStr) {   
                tokens.push(curStr + '"');
                curStr = '';
            }
           
            // 숫자 토큰화
            if (str[i].match(numRegex)) {
                numFlag = true;
                curNum += str[i];
            } else if(curNum) {
                numFlag = false;
                tokens.push(Number(curNum));
                curNum = '';
            }

            // 괄호 토큰화
            if (str[i].match(bracketRegex)) tokens.push(str[i]);

            // boolean 토큰화
           // , 다음에 따옴표로 시작하지않으면 일단 스트링은 아님.. 다음 쉼표까지 닫아버리기?



        // 문자 토큰화
        } else {
            curStr += str[i];
        }
    }


    console.log(tokens.stack);
    return tokens.stack;
}

const a = '["1 2 3", 23, true, null, {3.214}, {"key":"value"} "234ho"]';   
tokenizer(a);

// export default tokenizer;




// 토큰이름	샘플
// identifier	jk, hello, MyList
// keyword	if, for, class
// separator	{, }, [, ], ,
// operator	+, <, =
// literal	true, NULL, 3.14, "hello", 
// comment	/* 코멘트는 무시 */