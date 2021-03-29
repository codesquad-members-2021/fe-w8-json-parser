function tokenizer(str) {
    
    const tokens = [];

    const wordRegex = /".*."/
    const bracketRegex = /".*."/
    for(let i = 0; i < str.length; i++) {
        switch (str[i]) {
            case '[':
            case ']':
            case '{':
            case '}':
            case '(':
            case ')': 
                tokens.push(str[i]);
                break;
        }
    }
    
    
    console.log(tokens);


    return tokens;

}

const a = '["1 2 3", true]';     // ['[', "1, 2, 3", true ,']']
tokenizer(a);

// export default tokenizer;




// 토큰이름	샘플
// identifier	jk, hello, MyList
// keyword	if, for, class
// separator	{, }, [, ], ,
// operator	+, <, =
// literal	true, NULL, 3.14, "hello"
// comment	/* 코멘트는 무시 */