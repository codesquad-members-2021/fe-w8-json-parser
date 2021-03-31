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

  top() {
    return this.stack[this.stack.length - 1];
  }

  empty() {
    return this.stack.length === 0;
  }
}