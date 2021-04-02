import { Type } from "../const.js";

export default class SyntaxTreeNode {
  constructor({ type, value, propKey, propValue, depth } = {}) {
    this.type = type;
    this.depth = depth;
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

  setDepth(depth) {
    this.depth = depth;
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

  getPropKey() {
    return this.propKey;
  }

  getPropValue() {
    return this.propValue;
  }

  getDepth() {
    return this.depth;
  }

  toString() {
    const indent = Array(this.depth).join('\t');
    const innerIndent = indent + '\t';
    let result = `{`;
    let idx = 0;

    Object.entries(this).forEach(([prop, v]) => {
      if (!v || v?.length === 0 || prop === 'depth')
        return;

      if (idx++ > 0)
        result += ',';

      if (v instanceof SyntaxTreeNode) {
        result += `\n${innerIndent}"${prop}" : ${v.toString()}`;
        return;
      }

      if (prop !== 'child') {
        if (prop === 'value' && (this.type === Type.BOOLEAN || this.type === Type.NUMBER || this.type === Type.NULL))
          result += `\n${innerIndent}"${prop}" : ${v}`;
        else
          result += `\n${innerIndent}"${prop}" : "${v}"`;
        return;
      }

      if (prop !== 'child')
        throw new Error(`Invalid prop, must be 'child' here!`);
      
      result += v.reduce((resultStr, child, reduceIdx) => {
        return resultStr + (reduceIdx > 0 ? ',\n' : '\n') + innerIndent + child.toString();
      }, `\n${innerIndent}"child" : [`);
      result += `\n${innerIndent}]`;
    })

    result += `\n${indent}}`;
    return result;
  }
}