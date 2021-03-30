// Tokenizer : token 으로 자르기 -> 잘라진 토큰 정보가 모인 배열을 반환할 수 있음
class Tokenizer {
    constructor() {
        this.tokenType = {
            SEPARATOR: /\{|\}|\[|\]|\,|:|\s/,
            LITERAL: /null|undefined|(true|false)|(-?[0-9]+(?:\.[0-9]+)?)|("(?:[^"\\]*|\\")*")/,
        };
        this.stack = [];
    };
    createToken = (jsonData) => {
        const { SEPARATOR, LITERAL } = this.tokenType;
        let jsonDataTemp = jsonData;

        while (jsonDataTemp.length > 0) {
            if (jsonDataTemp[0] === " ") {
                jsonDataTemp = jsonDataTemp.slice(1);
                continue;
            }

            if (SEPARATOR.test(jsonDataTemp) && SEPARATOR.test(jsonDataTemp[0]))
                jsonDataTemp = this.addTokenToStack(SEPARATOR, jsonDataTemp)
            else
                jsonDataTemp = this.addTokenToStack(LITERAL, jsonDataTemp);
        }
    };

    addTokenToStack = (tokenType, jsonData) => {
        const currentStr = jsonData.match(tokenType)[0];
        this.stack.push(currentStr);
        return jsonData.replace(currentStr, '');
    };
}

export default Tokenizer;
