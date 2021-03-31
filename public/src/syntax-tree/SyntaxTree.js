import { Type } from '../const.js';
import TypeNode from './SyntaxTreeNode.js';
import SyntaxTreeNode from './SyntaxTreeNode.js';

export default class SyntaxTree {
  constructor() {
    this.root = new SyntaxTreeRootNode();
  }

  getRoot() {
    return this.root;
  }

  toString() {
    return this.root.toString();
  }
}

class SyntaxTreeRootNode extends SyntaxTreeNode{
  constructor() {
    super({ type: 'root'});
  }
}