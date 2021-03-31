const isSeparatorArray = (node) => {
  return node.getType() === "Separator-array-object" && node.getData() === "[" 
}

const isSeparatorObject = (node) => {
  return node.getType() === "Separator-array-object" && node.getData() === "{";
}

const isNotSeparator = (node) => {
  return !["Separator-key-value", "Separator-child", "Separator-array-object"].includes(node.getType());
}

const isObjectKey = (node) => {
  return node.getType() === "Object Key";
}

const dataInitializer = (node) => {
  if (isSeparatorArray(node)) 
    return { target: [], targetType: "Array" }
  else if (isSeparatorObject(node)) 
    return { target: {}, targetType: "Object"}
  else 
    return false;
}

const parsing = (leafNodes) => {
  let target;
  let targetType = null;
  let objectKey = null;

  leafNodes.map((node) => {

    if (node.constructor.name === "Node") { // 일반 토큰일 때
      
      const isInitializable = dataInitializer(node); // 클로저 데이터 활용을 위한 initialize
      if (isInitializable) {
        target = isInitializable.target;
        targetType = isInitializable.targetType;
        return;
      }
      
      // initialize가 진행되어 토큰을 처리
      switch (targetType) {
        case "Array":
          if (isNotSeparator(node)) target.push(node);
          break;
        case "Object":
          if (isObjectKey(node)) {
            objectKey = node.getData();
            target[objectKey] = null;
          } 
          else if (isNotSeparator(node)) target[objectKey] = node.getData();
          break;
      }
    }

    else { // 재귀 진행 가능한 토큰일 때 // node.constructor.name === "Branch"
      switch (targetType) {
        case "Array":
          target.push(parsing(node.getLeafNodes()));
          break;
        case "Object":
          target[objectKey] = parsing(node.getLeafNodes());
          break;
      }
    } 
  });

  return target;  
}

module.exports = parsing;