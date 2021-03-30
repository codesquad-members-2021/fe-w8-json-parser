// Lexer : token 단위에 의미 부여 -> 토큰에 어떤 의미를 담은 배열을 반환할 수 있음
class Lexer {
    constructor() {
        this.lexerType = {
            NULL: /null/,           // object type
            UNDEFINED: /undefined/, // object type
            BOOLEAN: /true|false/,
            NUMBER: /(-?[0-9]+(?:\.[0-9]+)?)/,
            STRING: /"(?:[^"\\]*|\\")*"/,
        }
    }
};

export default Lexer;