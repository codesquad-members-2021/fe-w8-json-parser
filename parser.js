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
      foo(currentNode, isObject, parentNode, ObjIndex)
    case 'seperator':
      if(value === "[")
        foo(parse(lexedArr, makeOpenBracketTemplate()), isObject, parentNode, ObjIndex)
      if(value === "{")
        foo(parse(lexedArr, makeOpenBraceTemplate(), "propKey"), isObject, parentNode, ObjIndex)
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
  }
  return parse(lexedArr, parentNode, isObject, ObjIndex)
}

const foo = (currentNode ,isObject, parentNode, ObjIndex) => {
  if (isObject === "propKey") parentNode.child[ObjIndex].value.propKey = currentNode
  else if (isObject === "propValue") parentNode.child[ObjIndex].value.propValue = currentNode
  else parentNode.child.push(currentNode)
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