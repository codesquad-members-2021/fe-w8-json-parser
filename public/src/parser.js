export default class Parser {
  constructor(lexerList) {
    this.lexerList = lexerList;
  }

  parse(parentNode = { type: 'array', child: [] }) {
    while (this.lexerList.length > 0) {
      const element = this.lexerList.shift();
      if (element.type === 'arrayOpen') {
        const childNode = this.parse();
        parentNode.child.push(childNode);
      } else if (element.type === 'arrayClose') {
        break;
      } else {
        parentNode.child.push({ type: this.checkType(element.value), value: element.value });
      }
    }
    return parentNode;
  }
  checkType(value) {
    if (!isNaN(Number(value))) return 'number';
    if (value === null) return 'NULL';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'string') return 'String';
  }
}
