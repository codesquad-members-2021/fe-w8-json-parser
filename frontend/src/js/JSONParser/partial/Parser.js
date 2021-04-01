// Parser : 구분분석 후 parse Tree 생성 -> 객체형태의 Tree 구조를 생성.
class Parser {
    /**
     * 
     * @param {Array} lexerTokens 
     * @returns parseTree(Object)
     */
    createParseTree = (lexerTokens, parentNode = {}, prev = null ) => {

        while (lexerTokens.length > 0) {

            const lexerToken = lexerTokens.shift(); // 배열 맨 앞 원소 추출
            const {key, type, value, child} = lexerToken;

            if (type === 'null') {
                if (parentNode.type === 'object' && parentNode.child) {
                    const lastChildIdx = (parentNode.child.length-1) ? (parentNode.child.length-1) : 0;
                    const lastChild = parentNode.child[lastChildIdx];

                    if (lastChild && ('propKey' in lastChild.value)) {
                        lastChild.value.propValue = { type: 'object', value: null };
                        lastChild.type = "objectProperty";
                    }
                } else {
                    parentNode.child.push({ type: 'object', value: null });
                }
            } else if (type === 'boolean') {
                if (parentNode.type === 'object' && parentNode.child) {
                    const lastChildIdx = (parentNode.child.length-1) ? (parentNode.child.length-1) : 0;
                    const lastChild = parentNode.child[lastChildIdx];

                    if (lastChild && ('propKey' in lastChild.value)) {
                        lastChild.value.propValue = { type, value: value === 'true' ? true : false };
                        lastChild.type = "objectProperty";
                    }
                } else {
                    parentNode.child.push({ type, value: value === 'true' ? true : false });
                }
            } else if (type === 'number') {
                if (parentNode.type === 'object' && parentNode.child) {
                    const lastChildIdx = (parentNode.child.length-1) ? (parentNode.child.length-1) : 0;
                    const lastChild = parentNode.child[lastChildIdx];

                    if (lastChild && ('propKey' in lastChild.value)) {
                        lastChild.value.propValue = {type, value: Number(value) };
                        lastChild.type = "objectProperty";
                    }
                } else {
                    parentNode.child.push({type, value: Number(value) });
                }
            } else if (type === 'string') {

                if (parentNode.type === 'object' && parentNode.child) {
                    const lastChildIdx = (parentNode.child.length-1) ? (parentNode.child.length-1) : 0;
                    const lastChild = parentNode.child[lastChildIdx];

                    if (lastChild) {
                        if ('propKey' in lastChild.value) {
                            lastChild.value.propValue = { type, value };
                            lastChild.type = "objectProperty";
                        }
                    } else {
                        parentNode.child.push({
                            value: {
                                propKey: {
                                    type,
                                    value: value.replace(
                                        /^(\"|')|(\"|')$/g,
                                        '',
                                    ),
                                },
                            },
                        });
                    }
                } else {
                    parentNode.child.push({type, value: value.replace(/^(\"|')|(\"|')$/g, '') });
                }
            } else if (type === 'arrayOpen') {
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
            } else if (type === 'arrayClose') {
                break;
            } else if (type === 'objectOpen') {
                const nodeTmp = this.createParseTree(lexerTokens, { type: 'object', child: [] } );

                if (parentNode.child)
                    parentNode.child.push(nodeTmp)
                else
                    parentNode = { ...nodeTmp };

            } else if (type === 'objectClose') {
                break;

            } else if (type === 'colon') {

            } else  
                console.log('ERROR!', type);

            prev = lexerToken;
            // --------------------------------------------
            // if (lexerToken === "dirstart") {
            //     const node = parseDir(lexerTokens);
            //     parentNode.child.push(node);
            // } else if (ele === "dirend") {
            //     break;
            // } else {
            //     parentNode.child.push({ type: "File", value: ele });
            // }
            // ----------------------------------------------
        }
        return parentNode;
    }
};

export default Parser;