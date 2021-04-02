const parse = (lexedArr, parentNode = {child:[]}, isObject = false, objIndex = 0, currentDepth = 0) => {
  if(!lexedArr.length) return parentNode.child;
  const {type, value} = lexedArr.shift()
  switch(type) {
    case 'separator':
      if(value === "[")
        addNode(parse(lexedArr, makeArrayTemplate()), parentNode, isObject, objIndex)
      if(value === "{")
        addNode(parse(lexedArr, makeObjectTemplate(), "propKey"), parentNode, isObject, objIndex)
      if(value === "]" || value === "}")
        return parentNode
      if(value === ":")
        return parse(lexedArr, parentNode, "propValue", objIndex)
      if(value === "," && isObject === "propValue") {
        parentNode.child.push(makePropertyTemplate())
        return parse(lexedArr, parentNode, "propKey", ++objIndex)
      }
      break;
    default :
      addNode({type, value}, parentNode, isObject, objIndex)
  }
  return parse(lexedArr, parentNode, isObject, objIndex)
}

const addNode = (node, parentNode, isObject, objIndex) => {
  if (isObject === "propKey") parentNode.child[objIndex].value.propKey = node
  else if (isObject === "propValue") parentNode.child[objIndex].value.propValue = node
  else parentNode.child.push(node)
}

const makeArrayTemplate = () => ({type: "array", child: []})

const makeObjectTemplate = () => ({type: "object", child: [makePropertyTemplate()]})

const makePropertyTemplate = () => ({value: {propKey: {}, propValue: {}}, type: "objectProperty"})

const countNumber = (lexedArr) => lexedArr.filter(({type}) => type === "number").length

const countString = (lexedArr) => lexedArr.filter(({type}) => type === "string").length

const countDepth = (lexedArr, stack = []) => {
  let maxDepth = 0;
  lexedArr
    .filter(({value}) => ["[", "]", "{", "}"].includes(value))
    .forEach(({value}) => {
      isPair(value, stack) ? stack.pop() : stack.push(value)
      maxDepth = maxDepth < stack.length ? stack.length : maxDepth
    })
  return maxDepth
}

const isPair = (value, stack) => {
  if (value === "]") return stack[stack.length-1] === "["
  if (value === "}") return stack[stack.length-1] === "{"
  return false
}

export { parse, countNumber, countString, countDepth }