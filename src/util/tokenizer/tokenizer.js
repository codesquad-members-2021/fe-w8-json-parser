const isSeparator = (char) => {
  return ["[", "]", ",", "{", "}", ":"].includes(char);
}

const isQuote = (char) => {
  return ["'", '"'].includes(char);
}

const tokenize = (splitData) => {
  let stack = [];
  let tokenStack = [];
  let quoteStack = [];

  for (const char of splitData) {
    if (isQuote(char)) {
      //""안에 []가 들어있을때도 분석할수있으니, 따로 구분하기/?어떻게하지...ㅠㅠ
      quoteStack.length === 0 ? quoteStack.push(char) : quoteStack.pop();
    }

    if (isSeparator(char) && quoteStack.length !== 1) {
      let token = stack.join("").trim(); //특수문자가 아닐 때 누적해둔 letter들
      stack = [];
      if (token !== "") tokenStack.push(token); //초반에 token에 넣을때는 공백이 들어가기에, 공백인지 아닌지 보고 넣기
      tokenStack.push(char);
      continue;
    }
    stack.push(char);
  }
  return tokenStack;
}

module.exports = tokenize;