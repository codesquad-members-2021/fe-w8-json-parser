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
     *
     * @param {Array} tokens
     * @returns
     */
    createLexerTokens = (tokens) => {
        const lexerTokens = [];

        while (tokens.length > 0) {
            const item = tokens.shift();
            const type = this.createTokenType(item);

            if (type === 'comma') continue;

            const lexerTokenParams = {
                type,
                value: item,
            };
            const lexerToken = new LexerToken(lexerTokenParams);
            lexerTokens.push(lexerToken);
        }

        return lexerTokens;
    };

    createTokenType = (tokenItem) => {
        let resultType = '';

        if (this.isNull(tokenItem)) resultType = 'null';    // Parse에서 type: Object
        else if (this.isBoolean(tokenItem)) resultType = 'boolean';
        else if (this.isString(tokenItem)) resultType = 'string';
        else if (this.isNumber(tokenItem)) resultType = 'number';
        else if (this.isArrayOpen(tokenItem)) resultType = 'arrayOpen';
        else if (this.isArrayClose(tokenItem)) resultType = 'arrayClose';
        else if (this.isObjectOpen(tokenItem)) resultType = 'objectOpen';
        else if (this.isObjectClose(tokenItem)) resultType = 'objectClose';
        else if (this.isComma(tokenItem)) resultType = 'comma';
        else if (this.isColon(tokenItem)) resultType = 'colon';
        else resultType = 'ERROR';

        return resultType;
    };

    isNull = (tokenItem) => this.lexerType.NULL.test(tokenItem);
    isBoolean = (tokenItem) => this.lexerType.BOOLEAN.test(tokenItem);
    isNumber = (tokenItem) => this.lexerType.NUMBER.test(tokenItem);
    isString = (tokenItem) => this.lexerType.STRING.test(tokenItem);
    isArrayOpen = (tokenItem) => this.lexerType.ARRAYOPEN.test(tokenItem);
    isArrayClose = (tokenItem) => this.lexerType.ARRAYCLOSE.test(tokenItem);
    isObjectOpen = (tokenItem) => this.lexerType.OBJECTOPEN.test(tokenItem);
    isObjectClose = (tokenItem) => this.lexerType.OBJECTCLOSE.test(tokenItem);
    isComma = (tokenItem) => this.lexerType.COMMA.test(tokenItem);
    isColon = (tokenItem) => this.lexerType.COLON.test(tokenItem);
}

export default Lexer;
