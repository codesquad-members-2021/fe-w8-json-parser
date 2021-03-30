// Tokenizer : token 으로 자르기 -> 잘라진 토큰 정보가 모인 배열을 반환할 수 있음
class Tokenizer {
    constructor() {
        this.tokenType = {
            SEPARATOR: /\{|\}|\[|\]|\,|:|\s/,
            LITERAL: /null|undefined|(true|false)|(-?[0-9]+(?:\.[0-9]+)?)|("(?:[^"\\]*|\\")*")/,
        };
        this.stack = [];
    };
    getTokenType = (charData) => {
        const { SEPARATOR, LITERAL } = this.tokenType;
        let charDataTemp = charData;

        while (charDataTemp.length > 0) {
            if (charDataTemp[0] === " ") {
                charDataTemp = charDataTemp.slice(1);
                continue;
            }

            if (SEPARATOR.test(charDataTemp) && SEPARATOR.test(charDataTemp[0])) {
                const currentStr = charDataTemp.match(SEPARATOR)[0];
                charDataTemp = charDataTemp.replace(currentStr, '');
                this.stack.push(currentStr);
            } else {
                const currentStr = charDataTemp.match(LITERAL)[0];
                charDataTemp = charDataTemp.replace(currentStr, '');
                this.stack.push(currentStr);
            }
        }
    };
}

export default Tokenizer;
