// Parser : 구분분석 후 parse Tree 생성 -> 객체형태의 Tree 구조를 생성.
class Parser {
    /**
     * 
     * @param {Array} lexerTokens 
     * @returns parseTree(Object)
     */
    createParseTree = (lexerTokens, node = {}) => {
        while (lexerTokens.length > 0) {
            const lexerToken = lexerTokens.shift(); // 배열 맨 앞 원소 추출
            const {key, type, value, child} = lexerToken;

            if (type === 'null') {
                if (node.child) {
                    node.child.push({ type, value })
                } else {
                    node.child = [];
                    node.type = 'array';
                    node.child.push(nodeTemp);
                }
            } else if (type === 'boolean') {

            } else if (type === 'number') {
                //node.child.push({ type, value })
                if (node.child) {
                    node.child.push({ type, value: Number(value) })
                }else{
                    node.child = [];
                    node.type = 'array';
                    node.child.push(nodeTemp);
                }
            } else if (type === 'string') {
                //node.child.push({ type, value })
                if (node.child) {
                    node.child.push({ type, value })
                }else{
                    node.child = [];
                    node.type = 'array';
                    node.child.push(nodeTemp);
                }
            } else if (type === 'arrayOpen') {
                if (node.child) {
                    node.child.push({ type, value })  
                } else {
                    node.child = [];
                    node.type = 'array';
                    const nodeTemp = this.createParseTree(lexerTokens, node); //해결 진행중
                }
            } else if (type === 'arrayClose') {
                //여기가 뭔가 이상해~~
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
        return node;
    }
};

export default Parser;