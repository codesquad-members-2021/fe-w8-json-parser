class Branch {
  constructor(){
    this.name = null;
    this.parentBranch = null;
    this.leafNodes = [];
  }
  setParentBranch(branch) {
    this.parentBranch = branch;
  }
  setLeafNode(node) {
    if (this.name === null) this.name = node.data;
    this.leafNodes.push(node);
  }
  setChildBranch(branch){
    this.childBranches.push(branch);
  }
  getLeafNodes(){
    return this.leafNodes;
  }
  getChildBranches() {
    return this.childBranches;
  }
  getParentBranch() {
    return this.parentBranch;
  }
}

module.exports = Branch;