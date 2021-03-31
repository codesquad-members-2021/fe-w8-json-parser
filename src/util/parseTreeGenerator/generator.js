const ParseTree = require('./parse-tree.js');
const Branch = require('./branch.js');
const Node = require('./node.js');

const generate = (tokens) => {
  const tree = new ParseTree();

  tokens.forEach(({type, value}) => {
    const node = new Node(type, value);
    
    if (value === "{" || value === "[" ) {
      const branch = new Branch();
      branch.setLeafNode(node);
      tree.getCurrent().setLeafNode(branch);
      
      const parentBranch = tree.getCurrent()
      branch.setParentBranch(parentBranch);
      tree.setCurrent(branch);

    } else if (value === "}" || value === "]") {
      tree.getCurrent().setLeafNode(node);
      tree.setCurrent(tree.getCurrent().getParentBranch());
    } else {
      tree.getCurrent().setLeafNode(node);
    }
  
  })

  return tree;
}


module.exports = generate;