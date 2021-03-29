export default class Stack {
  constructor() {
    this.stack = [];
  }

  push(e) {
    this.stack.push(e);
  }

  pop() {
    return this.stack.pop();
  }

  empty() {
    return this.stack.length === 0;
  }
}