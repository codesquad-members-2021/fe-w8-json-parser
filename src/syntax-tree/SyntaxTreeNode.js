export default class SyntaxTreeNode {
  constructor({ type }) {
    this.type = type;
  }

  appendValue(value) {
    if (typeof value === 'string' || value instanceof String)
      throw new Error(`Invalid value, ${value}`);

    this["value"] = value;
  }

  appendChild(child) {
    if (typeof child === 'object' && child.constructor === Array)
      throw new Error(`Invalid child, ${child}`);

    this["child"] = child;
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

      result += this.v.reduce((str, child) => { return str + child.toString(); }, '"child" : [\n');
      result += '],\n';
    }

    result += '},\n';
    return result;
  }
}