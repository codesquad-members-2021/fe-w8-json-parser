const parse = (lexedArr, parentNode = {child:[]}, isObject = false, ObjIndex = 0) => {
  if(!lexedArr.length) return parentNode
  const currentNode = lexedArr.shift()
  const {type, value} = currentNode
  switch(type) {
    case 'string':
    case 'number':
    case 'undefinded':
    case 'boolean':
    case 'null':
      if (isObject === "propKey") parentNode.child[ObjIndex].value.propKey = currentNode
      else if (isObject === "propValue") parentNode.child[ObjIndex].value.propValue = currentNode
      else parentNode.child.push(currentNode)
    case 'seperator':
      switch (value) {
        case "[":
          parentNode.child.push(parse(lexedArr, makeOpenBracketTemplate()))
        case "{":
          parentNode.child.push(parse(lexedArr, makeOpenBraceTemplate(), "propKey"))
        case "]":
        case "}":
          return parentNode
        case ":":
          return parse(lexedArr, parentNode, "propValue", ObjIndex)
        case ",":
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
      }
  }
  return parse(lexedArr, parentNode, isObject, ObjIndex)
}

const makeOpenBracketTemplate = () => {
  return {
    type: "array",
    child: [],
    value: "arrayObject"
  }
}

const makeOpenBraceTemplate = () => {
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