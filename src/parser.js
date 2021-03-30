import { Type } from './const.js';
import Queue from './container/Queue.js';
import Stack from './container/Stack.js';
import SyntaxTree from './syntax-tree/SyntaxTree.js';
import SyntaxTreeNode from './syntax-tree/SyntaxTreeNode.js';

// FIXME: reference issue? => deep copy 'tokens'..

export default function parse(tokens) {
  const syntaxTree = new SyntaxTree();
  childParse({ parentNode: syntaxTree.getRoot(), tokens });
  return syntaxTree;
}

function childParse({ parentNode, tokens }) {
  const tokenQueue = new Queue({ initialData: tokens });
  const child = [];

  while (!tokenQueue.empty()) {
    const currToken = tokenQueue.pop();

    if (currToken.type === Type.RBRAKET || currToken.type === Type.RBRACE) {
      continue;
    } else if (currToken.type === Type.LBRAKET) {
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
    } else if (currToken.type === Type.STRING ||
              currToken.type === Type.BOOLEAN || 
              currToken.type === Type.NUMBER) {
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