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
            const lexerToken = lexerTokens.shift(); // 배열 맨 앞 원소 추출
            const { type } = lexerToken;

            if (this.isPrimitiveType(type)) {
                const primitiveItem = this.createPrimitiveItem(lexerToken);

                if (parentNode.type === 'object' && parentNode.child)
                    this.createObjectProps(parentNode, lexerToken, primitiveItem);
                else
                    parentNode.child.push(primitiveItem);
            } else {
                if (type === 'arrayOpen') {
                    const nodeTmp = this.createParseTree(lexerTokens, { type: 'array', child: [], value: "arrayObject" } );

                    if (parentNode.type === 'object' && parentNode.child) {
                        const lastChildIdx = (parentNode.child.length-1) ? (parentNode.child.length-1) : 0;
                        const lastChild = parentNode.child[lastChildIdx];

                        if (lastChild && ('propKey' in lastChild.value)) {
                            lastChild.value.propValue = {...nodeTmp};
                            lastChild.type = "objectProperty";
                        }
                    } else {
                        if (parentNode.child)
                            parentNode.child.push(nodeTmp)
                        else
                            parentNode = { ...nodeTmp }; //결과값을 반환하기 직전
                    }
                } else if (type === 'objectOpen') {
                    const nodeTmp = this.createParseTree(lexerTokens, { type: 'object', child: [] } );

                    if (parentNode.child)
                        parentNode.child.push(nodeTmp)
                    else
                        parentNode = { ...nodeTmp };

                } else if ( (type === 'arrayClose') || (type === 'objectClose') ) {
                    break;
                } else console.log('ERROR!', type);
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

    createObjectProps = (parentNode, { type, value }, primitiveItem ) => {
        const lastChildIdx = (parentNode.child.length-1) ? (parentNode.child.length-1) : 0;
        const lastChild = parentNode.child[lastChildIdx];

        if (lastChild) {
            if (('propKey' in lastChild.value) && ('propValue' in lastChild.value)) {
                const strPropKey = this.createObjectPropKey(primitiveItem, {type, value});
                parentNode.child.push(strPropKey);
            } else if (('propKey' in lastChild.value)) {
                lastChild.value.propValue = primitiveItem || this.createPrimitiveItem({type, value});
                lastChild.type = "objectProperty";
            }
        } else {
            const strPropKey = this.createObjectPropKey(primitiveItem, {type, value});
            parentNode.child.push(strPropKey);
        }
    };

    isPrimitiveType = (type) => this.PRIMITIVE.test(type);
};

export default Parser;