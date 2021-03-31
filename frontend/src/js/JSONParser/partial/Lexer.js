// Lexer : token 단위에 의미 부여 -> 토큰에 어떤 의미를 담은 배열을 반환할 수 있음
import LexerToken from './LexerToken.js';

class Lexer {
    constructor() {
        this.lexerType = {
            NULL: /null/,
            BOOLEAN: /true|false/,
            NUMBER: /(-?[0-9]+(?:\.[0-9]+)?)/,
            STRING: /"(?:[^"\\]*|\\")*"/,
            ARRAYOPEN: /\[/,
            ARRAYCLOSE: /\]/,
            OBJECTOPEN: /{/,
            OBJECTCLOSE: /}/,
            COMMA: /,/,
            COLON: /:/,
        };
    }

    /**
     * @param {Array} tokens
     */
    createLexerTokens = (tokens) => {
        const lexerTokens = [];

        let idx = 0;
        while (tokens.length > 0) {
            const item = tokens.shift();
            const type = this.createTokenType(item);
            const lexerTokenParams = {
                key: idx,
                type,
                value: item,
            };
            const lexerToken = new LexerToken(lexerTokenParams);
            lexerTokens.push(lexerToken);
            idx++;
        }

        return lexerTokens;
    };

    createTokenType = (tokenItem) => {
        let resultType = '';

        if (this.isNull(tokenItem)) resultType = 'object';
        else if (this.isBoolean(tokenItem)) resultType = 'boolean';
        else if (this.isNumber(tokenItem)) resultType = 'number';
        else if (this.isString(tokenItem)) resultType = 'string';
        else if (this.isArrayOpen(tokenItem)) resultType = 'arrayOpen';
        else if (this.isArrayClose(tokenItem)) resultType = 'arrayClose';
        else if (this.isObjectOpen(tokenItem)) resultType = 'objectOpen';
        else if (this.isObjectClose(tokenItem)) resultType = 'objectClose';
        else if (this.isComma(tokenItem)) resultType = 'comma';
        else if (this.isColon(tokenItem)) resultType = 'colon';
        else resultType = 'ERROR';

        return resultType;
    };

    isNull = (tokenItem) => {
        return this.lexerType.NULL.test(tokenItem);
    };

    isBoolean = (tokenItem) => {
        return this.lexerType.BOOLEAN.test(tokenItem);
    };

    isNumber = (tokenItem) => {
        return this.lexerType.NUMBER.test(tokenItem);
    };

    isString = (tokenItem) => {
        return this.lexerType.STRING.test(tokenItem);
    };
    isArrayOpen = (tokenItem) => {
        return this.lexerType.ARRAYOPEN.test(tokenItem);
    };

    isArrayClose = (tokenItem) => {
        return this.lexerType.ARRAYCLOSE.test(tokenItem);
    };

    isObjectOpen = (tokenItem) => {
        return this.lexerType.OBJECTOPEN.test(tokenItem);
    };
    isObjectClose = (tokenItem) => {
        return this.lexerType.OBJECTCLOSE.test(tokenItem);
    };
    isComma = (tokenItem) => {
        return this.lexerType.COMMA.test(tokenItem);
    };

    isColon = (tokenItem) => {
        return this.lexerType.COLON.test(tokenItem);
    };
}

export default Lexer;
