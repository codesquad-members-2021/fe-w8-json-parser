// Parser : 구분분석 후 parse Tree 생성 -> 객체형태의 Tree 구조를 생성.
class Parser {
    constructor() {
        this.QUOTES = /^(\"|')|(\"|')$/g;
        this.PRIMITIVE = /null|boolean|number|string/;
    }

    /**
     * 
     * @param {Array} lexerTokens 
     * @returns parseTree(Object)
     */
    createParseTree = (lexerTokens, parentNode = {} ) => {
        while (lexerTokens.length > 0) {
            const lexerToken = lexerTokens.shift();
            const { type } = lexerToken;

            if ( (type === 'arrayClose') || (type === 'objectClose') ) break;

            const primitiveFlag = this.isPrimitiveType(type);

            const item = primitiveFlag
                ? this.createPrimitiveItem(lexerToken)
                : this.createParseTree(
                      lexerTokens,
                      type === 'objectOpen' //lexerToken의 type이 objectOpen일 때 
                          ? { type: 'object', child: [] }
                          : { type: 'array', child: [], value: 'arrayObject' },
                  ); //(parentNode.type === 'object')  재귀(createParseTree)로 들어가고 나서야 생김

            if ( (parentNode.type === 'object') && parentNode.child) {
                this.createObjectProps(parentNode, lexerToken, item);
            } else {
                if (!primitiveFlag) {
                    if (parentNode.child)
                        parentNode.child.push(item)
                    else
                        parentNode = { ...item };
                } else
                    parentNode.child.push(item);
            }
        }
        return parentNode;
    }


    // parentNode.child에 들어갈 아이템 or propValue 생성 (null, boolean, number, string)
    createPrimitiveItem = ({type, value}) => {
        let resultItem;
        switch (type) {
            case 'null':
                resultItem = { type: 'object', value: null };
                break;
            case 'boolean':
                resultItem = {
                    type,
                    value: value === 'true' ? true : false,
                };
                break;
            case 'number':
                resultItem = { type, value: Number(value) };
                break;
            case 'string':
                resultItem = {
                    type,
                    value: value.replace(this.QUOTES, ''),
                };
                break;
            default:    break;
        }
        return resultItem;
    };

    createObjectPropKey = (primitiveItem, { type, value }) => ({
        value: {
            propKey: primitiveItem || this.createPrimitiveItem({ type, value }),
        }
    })

    createObjectProps = (parentNode, { type, value }, propValueItem ) => {
        const lastChildIdx = (parentNode.child.length-1) ? (parentNode.child.length-1) : 0;
        const lastChild = parentNode.child[lastChildIdx];

        if (lastChild) {
            if (('propKey' in lastChild.value) && ('propValue' in lastChild.value)) {
                const strPropKey = this.createObjectPropKey(propValueItem, {type, value});
                parentNode.child.push(strPropKey);
            } else if (('propKey' in lastChild.value)) {
                const propValue =
                    type === 'arrayOpen'
                        ? { ...propValueItem }
                        : propValueItem;

                lastChild.value.propValue = propValue;
                lastChild.type = "objectProperty";
            }
        } else {
            const strPropKey = this.createObjectPropKey(propValueItem, {type, value});
            parentNode.child.push(strPropKey);
        }
    };

    isPrimitiveType = (type) => this.PRIMITIVE.test(type);
};

export default Parser;