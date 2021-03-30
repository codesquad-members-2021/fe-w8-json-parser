import { Type } from '../const.js';
import TypeNode from './SyntaxTreeNode.js';
import SyntaxTreeNode from './SyntaxTreeNode.js';

export default class SyntaxTree {
  constructor({ type, value }) {
    this.root = new SyntaxTreeNode({ type });
    this.root.appendValue(value);
  }

  getRoot() {
    return this.root;
  }

  toString() {
    return this.root.toString();
  }
}