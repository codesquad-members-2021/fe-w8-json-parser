export default class SyntaxTreeNode {
  constructor({ type, value, propKey, propValue } = {}) {
    this.type = type;
    this.child;
    this.value = value;
    this.propKey = propKey;
    this.propValue = propValue;
  }

  appendChild(node) {
    if (!node instanceof SyntaxTreeNode)
      throw new Error(`Invalid node, ${node}`);

    if (!this.child)
      this.child = [];

    this.child.push(node);
  }

  setValue(value) {
    this.value = value;
  }

  setType(type) {
    this.type = type;
  }

  setPropKey(keyNode) {
    if (!keyNode instanceof SyntaxTreeNode)
      throw new Error(`Invalid node, ${keyNode}`);

    this.propKey = keyNode;
  }

  setPropValue(valueNode) {
    if (!valueNode instanceof SyntaxTreeNode)
      throw new Error(`Invalid node, ${valueNode}`);

    this.propValue = valueNode;
  }

  getType() {
    return this.type;
  }

  getValue() {
    return this.value;
  }

  getChild() {
    return this.child;
  }

  getPropValue() {
    return this.propValue;
  }

  toString() {
    let result = '{\n';

    for (const [prop, v] of Object.entries(this)) {
      if (prop !== 'child') {
        result += `"${prop}" : "${v}",\n`;
        continue;
      }

      if (prop.length === 0)
        continue;

      if (v instanceof SyntaxTreeNode) {

        continue;
      }

      result += this.v.reduce((str, child) => { return str + child.toString(); }, '"child" : [\n');
      result += '],\n';
    }

    result += '},\n';
    return result;
  }
}