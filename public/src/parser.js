import { Type } from './const.js';
import Queue from './container/Queue.js';
// import Stack from './container/Stack.js';
import SyntaxTree from './syntax-tree/SyntaxTree.js';
import SyntaxTreeNode from './syntax-tree/SyntaxTreeNode.js';

// FIXME: reference issue? => deep copy 'tokens'..

export function parse(tokens) {
  const syntaxTree = new SyntaxTree();
  childParse({ parentNode: syntaxTree.getRoot(), tokens });
  return syntaxTree;
}

function childParse({ parentNode, tokens }) {
  const tokenQueue = new Queue({ initialData: tokens });

  while (!tokenQueue.empty()) {
    const currToken = tokenQueue.pop();

    if (currToken.type === Type.RBRAKET || currToken.type === Type.RBRACE)
      throw new Error(`Invalid syntax, unmatched ${currToken.value}`);

    if (parentNode.getType() === Type.OBJECT) {
      const propKeyToken = currToken;

      if (propKeyToken.type !== Type.STRING)
        throw new Error('A key in object is not string type!');

      if (tokenQueue.pop().type !== Type.COLON)
        throw new Error(`Invalid syntax, ':' is not exist!`);

      const objPropNode = new SyntaxTreeNode({ type: Type.OBJECT_PROPERTY });
      const valueNode = new SyntaxTreeNode({ propKey: new SyntaxTreeNode(propKeyToken) });
      const propValueToken = tokenQueue.pop();

      if (propValueToken.type === Type.STRING || propValueToken.type === Type.BOOLEAN || propValueToken.type === Type.NUMBER) {
        const propValueNode = new SyntaxTreeNode(propValueToken);
        valueNode.setPropValue(propValueNode);
      } else if (propValueToken.type === Type.LBRAKET) {
        const propValueNode = new SyntaxTreeNode({ type: Type.ARRAY, value: 'arrayObject' });
        childParse({
          parentNode: propValueNode,
          tokens: getPartialTokens({ rightType: Type.RBRAKET, tokenQueue })
        });
        valueNode.setPropValue(propValueNode);
      } else if (propValueToken.type === Type.LBRACE) {
        const propValueNode = new SyntaxTreeNode({ type: Type.OBJECT });
        childParse({
          parentNode: propValueNode,
          tokens: getPartialTokens({ rightType: Type.RBRACE, tokenQueue })
        });
        valueNode.setPropValue(propValueNode);
      } else {
        throw new Error(`Invalid propValue type, ${propValueToken.type}`);
      }

      objPropNode.setValue(valueNode);
      parentNode.appendChild(objPropNode);
      continue;
    }

    if (currToken.type === Type.LBRAKET) {
      const newNode = new SyntaxTreeNode({ type: Type.ARRAY, value: 'arrayObject' });
      childParse({
        parentNode: newNode,
        tokens: getPartialTokens({ rightType: Type.RBRAKET, tokenQueue })
      });
      parentNode.appendChild(newNode);
    } else if (currToken.type === Type.LBRACE) {
      const newNode = new SyntaxTreeNode({ type: Type.OBJECT });
      childParse({
        parentNode: newNode,
        tokens: getPartialTokens({ rightType: Type.RBRACE, tokenQueue })
      });
      parentNode.appendChild(newNode);
    } else if (currToken.type === Type.COLON) {
      throw new Error(`Invalid syntax, invalid ':'`);
    } else if (currToken.type === Type.STRING || currToken.type === Type.BOOLEAN || currToken.type === Type.NUMBER || currToken.type === Type.NULL) {
      const newNode = new SyntaxTreeNode({ type: currToken.type, value : currToken.value });
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
    const token = tokenQueue.pop();

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