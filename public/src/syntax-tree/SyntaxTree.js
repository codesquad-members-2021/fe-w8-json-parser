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

  getArrayDepth() {
    return arrayDepthRecursion({ currNode: this.root.getEntryNode(), depth: 0 });
  }

  toString() {
    return this.root.getEntryNode()?.toString();
  }
}

class SyntaxTreeRootNode extends SyntaxTreeNode {
  constructor() {
    super({ type: 'root'});
  }

  getEntryNode() {
    return this.child?.[0];
  }
}

function arrayDepthRecursion({ currNode, depth }) {
  return currNode.getChild()?.reduce((resultDepth, childNode) => {
    if (childNode.getType() === Type.OBJECT_PROPERTY)
      resultDepth = Math.max(resultDepth, arrayDepthRecursion({ currNode: childNode.getValue().getPropValue(), depth }) ?? 0);
    
    return Math.max(resultDepth, arrayDepthRecursion({ currNode: childNode, depth }) ?? 0);
  }, urrNode.getType() === Type.ARRAY ? depth + 1 : depth);
}