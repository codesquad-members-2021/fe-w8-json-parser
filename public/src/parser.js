export default class Parser {
  constructor(lexerList) {
    this.lexerList = lexerList;

    this.objectValue = {};
  }
  isObject(element) {
    return element.type === 'objectOpen' ? 'object' : 'array';
  }
  parse(type) {
    const parentNode = { type: type || `syntaxTree`, child: [] };
    while (this.lexerList.length > 0) {
      const element = this.lexerList.shift();
      if (element.type === 'arrayOpen') {
        const childNode = this.parse('array');
        parentNode.child.push(childNode);
      } else if (element.type === 'arrayClose') {
        break;
      } else if (element.type === 'objectOpen') {
        const childNode = this.parse('object');
        console.log(childNode);
        parentNode.child.push(childNode);
      } else if (element.type === 'objectClose') {
        break;
      } else if (element.value === ':') continue;
      else if (element.propType === 'objectKey') {
        const propKey = {};
        propKey.type = this.checkType(element.value);
        propKey.value = element.value;
        this.objectValue.propKey = propKey;
      } else if (element.propType === 'objectValue') {
        const propValue = {};
        propValue.type = this.checkType(element.value);
        propValue.value = element.value;
        this.objectValue.propValue = propValue;

        parentNode.child.push({ type: 'objectProperty', value: { ...this.objectValue } });
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
    if (typeof value === 'object') return 'objectProperty';
  }
}
