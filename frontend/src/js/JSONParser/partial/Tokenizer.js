// Tokenizer : token 으로 자르기 -> 잘라진 토큰 정보가 모인 배열을 반환할 수 있음
class Tokenizer {
    constructor() {
        // https://lucas.codesquad.kr/main/course/마스터즈-FE-클래스/8주차-JSON-Parser/AST생성과-분석
        this.tokenType = {
            SEPARATOR: /\{|\}|\[|\]|\,|(\s?:\s?)|(\s+)/,
            OPERATOR: /\+|\<|\>|\=|\*|\/|\-/,
            LITERAL: /null|undefined|(true|false)|(-?[0-9]+(?:\.[0-9]+)?)|("(?:[^"\\]*|\\")*")/,
        };
        this.stack = [];
        this.stack2 = [];
    }
    getTokenType = (charData) => {
        const { SEPARATOR, OPERATOR, LITERAL } = this.tokenType;
        let charDataTemp = charData;
        let cnt = 0;

        while (!charDataTemp.length) {
            if (SEPARATOR.test(charDataTemp)) {
            } else {
                if (LITERAL.test(charDataTemp)) {
                    const currentStr = charDataTemp.match(LITERAL)[0];
                    const currentStrLength = currentStr.length;
                    charDataTemp = charDataTemp.replace(currentStr, '');
                    console.log(currentStr);
                    console.log(charDataTemp);
                    this.stack2.push(charDataTemp.match(LITERAL)[0]);
                }
            }
            cnt++;
        }

        // while (!charDataTemp.length) {

        //     const currentChar = charDataTemp[cnt];
        //     if (SEPARATOR.test(currentChar)) {
        //         charDataTemp = charDataTemp.replace(currentChar, '');
        //         this.stack.push(currentChar);
        //     } else {
        //         if (LITERAL.test(charDataTemp)) {
        //             const currentStr = charDataTemp.match(LITERAL)[0];
        //             const currentStrLength = currentStr.length;
        //             charDataTemp = charDataTemp.replace(currentStr, '');
        //             console.log(currentStr);
        //             console.log(charDataTemp);
        //             this.stack2.push(charDataTemp.match(LITERAL)[0]);
        //         }
        //     }
        //     cnt++;
        // }
        // console.log(charDataTemp);

        // console.log('stack1', this.stack);
        // console.log(this.stack2);
    };
}

export default Tokenizer;
