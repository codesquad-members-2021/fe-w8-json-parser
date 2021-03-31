const Branch = require('./branch.js');

class ParseTree {
  constructor(){
    this.root = new Branch();
    this.current = this.root;
  }
  setRoot(branch) {
    this.root = branch;
  }
  getRoot() {
    return this.root;
  }
  getCurrent() {
    return this.current;
  }
  setCurrent(current) {
    this.current = current;
  }
}

module.exports = ParseTree;