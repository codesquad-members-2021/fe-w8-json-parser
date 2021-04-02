// Tokenizer : token 으로 자르기 -> 잘라진 토큰 정보가 모인 배열을 반환할 수 있음
class Tokenizer {
    constructor() {
        this.tokenType = {
            SEPARATOR: /{|}|\[|\]|,|:|\s/,
            LITERAL: /null|(true|false)|(-?[0-9]+(\.[0-9]+)?)|("([^"\\]*|\\")*")/,
        };
    };

    createTokens = (strInputData) => {
        const { SEPARATOR, LITERAL } = this.tokenType;
        const arrToken = [];

        while (strInputData.length > 0) {
            if (strInputData[0] === " ") {
                strInputData = strInputData.slice(1);
                continue;
            }

            if (SEPARATOR.test(strInputData) && SEPARATOR.test(strInputData[0]))
                strInputData = this.addTokenToStack(arrToken, SEPARATOR, strInputData)
            else
                strInputData = this.addTokenToStack(arrToken, LITERAL, strInputData);
        }

        return arrToken;
    };

    /**
     * @param {Array} arrToken 
     * @param {String} tokenType 
     * @param {String} inputData 
     * @returns 
     */
    addTokenToStack = (arrToken, tokenType, inputData) => {
        const currentStr = inputData.match(tokenType)[0];
        arrToken.push(currentStr);
        return inputData.replace(currentStr, '');
    };
}

export default Tokenizer;
