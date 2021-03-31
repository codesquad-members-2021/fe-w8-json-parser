class Node {
  constructor(type, value){
    this.type = type;
    this.data = value;
  }
  getType() {
    return this.type;
  }
  getData() {
    return this.data;
  }
}

module.exports = Node;