export default class Tokenizer {
  constructor(inputData) {
    this.inputData = inputData;
    this.tokenArr = [];
    this.stack = [];
    this.getToken();
  }

  getTokenList() {
    return this.tokenArr;
  }

  getToken() {
    for (let i = 0; i < this.inputData.length; i++) {
      if (this.isQuote(this.inputData[i]) && !this.isFullSatck()) {
        this.stack.push(this.inputData[i]);
        this.pushToken(this.inputData[i]);
        continue;
      } else if (this.isQuote(this.inputData[i]) && this.isFullSatck()) {
        this.stack.pop();
      }

      if (this.isSaperator(this.inputData[i]) && !this.isFullSatck()) {
        this.pushToken(this.inputData[i]);
      } else if (this.isSaperator(this.inputData[i - 1]) && this.isNotFisrt(i) && !this.isFullSatck()) {
        this.pushToken(this.inputData[i]);
      } else {
        this.makeString(this.inputData[i]);
      }
    }
    const tokenList = this.tokenArr.map((el) => el.trim());
    const realTokenList = tokenList.filter((el) => el !== '' && el !== ',');
    this.tokenArr = realTokenList;
    return this.tokenArr;
  }
  pushToken(data) {
    this.tokenArr.push(data);
  }

  makeString(data) {
    return (this.tokenArr[this.tokenArr.length - 1] += data);
  }

  isSaperator(data) {
    const saperatorArr = ['[', ']', ',', '{', '}', ':'];
    return saperatorArr.includes(data);
  }

  isNotFisrt(idx) {
    return idx >= 1;
  }

  isQuote(data) {
    return data === '"';
  }

  isFullSatck() {
    return this.stack.length !== 0;
  }
}
