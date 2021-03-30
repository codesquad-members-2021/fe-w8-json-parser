// Tokenizer : token 으로 자르기 -> 잘라진 토큰 정보가 모인 배열을 반환할 수 있음
class Tokenizer {
    constructor() {
        // https://lucas.codesquad.kr/main/course/마스터즈-FE-클래스/8주차-JSON-Parser/AST생성과-분석
        this.tokenType = {
            // IDENTIFIER: /type|child|value|propKey|propValue/,
            // KEYWORD: /if|for|class|else|/,
            // COMMENT: 'comment',
            SEPARATOR: /\{|\}|\[|\]|\,/,
            OPERATOR: /\+|\<|\>|\=|\*|\/|\-/,
            LITERAL: 'literal',
        };
    };
    getTokenType = (charData) => {

    };

}

export default Tokenizer;