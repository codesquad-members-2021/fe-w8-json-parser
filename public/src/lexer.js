export default class Lexer {
  constructor(tokenList) {
    this.tokenList = tokenList;
    this.lexerList = [];
  }

  getLexerList() {
    this.tokenList.forEach((el) => this.pushList(this.getTokenElement(el)));
    return this.lexerList;
  }
  pushList(el) {
    this.lexerList.push(el);
  }

  getTokenElement(element) {
    const elementObj = {};
    if (element === '[') {
      (elementObj.type = 'arrayOpen'), (elementObj.value = element);
      return elementObj;
    }
    if (element === ']') {
      (elementObj.type = 'arrayClose'), (elementObj.value = element);
      return elementObj;
    }
    if (!isNaN(Number(element))) {
      (elementObj.type = 'number'), (elementObj.value = element);
      return elementObj;
    }
    if (typeof element === 'string') {
      (elementObj.type = 'string'), (elementObj.value = element);
      return elementObj;
    }
    if (typeof element === 'boolean') {
      (elementObj.type = 'boolean'), (elementObj.value = element);
      return elementObj;
    }
    if (element === null) {
      (elementObj.type = 'null'), (elementObj.value = element);
      return elementObj;
    }

    return elementObj;
  }
}
