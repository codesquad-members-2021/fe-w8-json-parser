const parse = (lexedArr, parentNode = {child:[]}, isObject = false, ObjIndex = 0) => {
  if(!lexedArr.length) return parentNode
  const {type, value} = lexedArr.shift()
  switch(type) {
    case 'separator':
      if(value === "[")
        addNode(parse(lexedArr, makeArrayTemplate()), parentNode, isObject, ObjIndex)
      if(value === "{")
        addNode(parse(lexedArr, makeObjectTemplate(), "propKey"), parentNode, isObject, ObjIndex)
      if(value === "]" || value === "}")
        return parentNode
      if(value === ":")
        return parse(lexedArr, parentNode, "propValue", ObjIndex)
      if(value === ",")
        if(isObject === "propValue") {
          parentNode.child.push({
            "value": {
              "propKey": {},
              "propValue": {}
            },
            "type": "objectProperty"
          })
          return parse(lexedArr, parentNode, "propKey", ++ObjIndex)
        }
      break;
    default :
      addNode({type, value}, parentNode, isObject, ObjIndex)
  }
  return parse(lexedArr, parentNode, isObject, ObjIndex)
}

const addNode = (node, parentNode, isObject, ObjIndex) => {
  if (isObject === "propKey") parentNode.child[ObjIndex].value.propKey = node
  else if (isObject === "propValue") parentNode.child[ObjIndex].value.propValue = node
  else parentNode.child.push(node)
}

const makeArrayTemplate = () => {
  return {
    type: "array",
    child: [],
    value: "arrayObject"
  }
}

const makeObjectTemplate = () => {
  return {
    "type": "object",
    "child": [{
      "value": {
        "propKey": {},
        "propValue": {}
      },
      "type": "objectProperty"
    }]
  }
}

export { parse }