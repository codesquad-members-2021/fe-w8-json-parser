import { Type } from './const.js';
import Queue from './container/Queue.js';
import SyntaxTree from './syntax-tree/SyntaxTree.js';
import SyntaxTreeNode from './syntax-tree/SyntaxTreeNode.js';

// FIXME: reference issue? => deep copy 'tokens'..

export function parse(tokens) {
  const syntaxTree = new SyntaxTree();
  childParse({ parentNode: syntaxTree.getRoot(), tokens, depth: 0 });
  return syntaxTree;
}

function childParse({ parentNode, tokens, depth }) {
  const tokenQueue = new Queue({ initialData: tokens });

  while (!tokenQueue.empty()) { // shift tokenQueue until it's empty
    const currToken = tokenQueue.shift();

    if (currToken.type === Type.RBRAKET || currToken.type === Type.RBRACE)
      throw new Error(`Invalid syntax, unmatched ${currToken.value}`);

    if (parentNode.getType() === Type.OBJECT) { // if parent node is object
      const propKeyToken = currToken;

      if (propKeyToken.type !== Type.STRING)  // key is should be "key"
        throw new Error('A key in object is not string type!');

      if (tokenQueue.shift().type !== Type.COLON) // next of "key" is shold be :
        throw new Error(`Invalid syntax, ':' is not exist!`);

      const objPropNode = new SyntaxTreeNode({ type: Type.OBJECT_PROPERTY, depth: depth + 1 });
      const valueNode = new SyntaxTreeNode({ depth: objPropNode.getDepth() + 1 });
      const propKeyNode = new SyntaxTreeNode({ type: propKeyToken.type, value: propKeyToken.value, depth: valueNode.getDepth() + 1 });
      valueNode.setPropKey(propKeyNode);
      
      const propValueToken = tokenQueue.shift();
      const propValueNode = new SyntaxTreeNode({ depth: valueNode.getDepth() + 1 });

      if (propValueToken.type === Type.STRING || propValueToken.type === Type.BOOLEAN || propValueToken.type === Type.NUMBER) {
        propValueNode.setType(propValueToken.type);
        propValueNode.setValue(propValueToken.value);
      } else if (propValueToken.type === Type.LBRAKET) {    // if value token is array
        propValueNode.setType(Type.Array);
        propValueNode.setValue('arrayObject');
        childParse({    // recursion this function with array type
          parentNode: propValueNode,
          tokens: getPartialTokens({ rightType: Type.RBRAKET, tokenQueue }),
          depth: valueNode.getDepth() + 1
        });
      } else if (propValueToken.type === Type.LBRACE) {   // if value token is object
        propValueNode.setType(Type.OBJECT);
        childParse({  // recursion this function with object type
          parentNode: propValueNode,
          tokens: getPartialTokens({ rightType: Type.RBRACE, tokenQueue }),
          depth: valueNode.getDepth() + 1
        });
      } else {
        throw new Error(`Invalid propValue type, ${propValueToken.type}`);
      }
      
      valueNode.setPropValue(propValueNode);
      objPropNode.setValue(valueNode);
      parentNode.appendChild(objPropNode);
      continue;   // object case of parent node is end
    }

    if (currToken.type === Type.LBRAKET) {    // if token is [
      const newNode = new SyntaxTreeNode({ type: Type.ARRAY, value: 'arrayObject', depth: depth + 1 });
      childParse({
        parentNode: newNode,
        tokens: getPartialTokens({ rightType: Type.RBRAKET, tokenQueue }),
        depth: depth + 1
      });
      parentNode.appendChild(newNode);
    } else if (currToken.type === Type.LBRACE) {
      const newNode = new SyntaxTreeNode({ type: Type.OBJECT, depth: depth + 1 });
      childParse({
        parentNode: newNode,
        tokens: getPartialTokens({ rightType: Type.RBRACE, tokenQueue }),
        depth: depth + 1
      });
      parentNode.appendChild(newNode);
    } else if (currToken.type === Type.COLON) {
      throw new Error(`Invalid syntax, invalid ':'`);
    } else if (currToken.type === Type.STRING || currToken.type === Type.BOOLEAN || currToken.type === Type.NUMBER || currToken.type === Type.NULL) {
      const newNode = new SyntaxTreeNode({ type: currToken.type, value : currToken.value, depth: depth + 1 });
      parentNode.appendChild(newNode);
    } else {
      throw new Error(`Invalid tokens, ${tokens}`);
    }
  }
}

export function getPartialTokens({ rightType, tokenQueue }) {
  const result = [];
  let leftType;
  let leftTypeCnt = 0;

  if (rightType === Type.RBRAKET) 
    leftType = Type.LBRAKET;
  else if (rightType === Type.RBRACE)
    leftType = Type.LBRACE;
  else
    throw new Error(`Invalid argument, ${rightType}`);

  while (!tokenQueue.empty()) {
    const token = tokenQueue.shift();

    if (token.type === leftType)
      leftTypeCnt++;
    else if (token.type === rightType) {
      if (leftTypeCnt > 0)
        leftTypeCnt--;
      else if (leftTypeCnt === 0)
        break;
      else
        throw new Error(`Invalid tokens, ${tokens}`);
    }

    result.push(token);
  }

  return result;
}