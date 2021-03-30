export default class SyntaxTreeNode {
  constructor({ type, value, propKey, propValue }) {
    this.type = type;
    this.child = [];
    this.value = value;
    this.propKey = propKey;
    this.propValue = propValue;
  }

  appendChild(node) {
    if (!node instanceof SyntaxTreeNode)
      throw new Error(`Invalid node, ${node}`);

    this.child.push(node);
  }

  getType() {
    return this.type;
  }

  getValue() {
    return this.value;
  }

  getChild() {
    return this.child ?? null;
  }

  toString() {
    const result = '{\n';

    for (const [prop, v] of Object.entries(this)) {
      if (prop !== 'child') {
        result += `"${prop}" : "${v}",\n`;
        continue;
      }

      if (prop.length === 0)
        continue;

      result += this.v.reduce((str, child) => { return str + child.toString(); }, '"child" : [\n');
      result += '],\n';
    }

    result += '},\n';
    return result;
  }
}

function toStringObjectProperty(node) {
  
}