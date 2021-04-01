// Parser : 구분분석 후 parse Tree 생성 -> 객체형태의 Tree 구조를 생성.
class Parser {
    /**
     * 
     * @param {Array} lexerTokens 
     * @returns parseTree(Object)
     */
    createParseTree = (lexerTokens, parentNode = {} ) => {
        while (lexerTokens.length > 0) {
            const lexerToken = lexerTokens.shift(); // 배열 맨 앞 원소 추출
            const {key, type, value, child} = lexerToken;

            if (type === 'null') {
                parentNode.child.push({ type: 'object', value: null });
            } else if (type === 'boolean') {
                parentNode.child.push({ type, value: value === 'true' ? true : false });
            } else if (type === 'number') {
                parentNode.child.push({type, value: Number(value) });
            } else if (type === 'string') {
                parentNode.child.push({type, value: value.replace(/^(\"|')|(\"|')$/g, '') });
            } else if (type === 'arrayOpen') {
                const nodeTmp = this.createParseTree(lexerTokens, { type: 'array', child: [] } );
                
                if (parentNode.child) 
                    parentNode.child.push(nodeTmp)
                else
                    parentNode = { ...nodeTmp };
                // const s = Object.create(nodeTmp);
                // console.log(nodeTmp, '----------------------');
                
                // console.log(parentNode, '----------------------');
                // parentNode.child.push(nodeTmp);
            } else if (type === 'arrayClose') {
                break;
            } else if (type === 'objectOpen') {

            } else if (type === 'objectClose') {

            } else if (type === 'colon') {

            } else
                console.log('ERROR!', type);


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