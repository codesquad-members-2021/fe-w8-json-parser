import _ from '../util.js';
import sampleData from "./partial/sample/sampleData.js";

class JSONParser {
    constructor(parserReference, { tokenizer, lexer, parser }) {
        const {
            inputTextAreaSelector,
            resultTextAreaSelector,
            analysisBtnSelector,
            sampleWrapSelector,
            resultSummarySelector,
        } = parserReference;
        this.$inputTextArea = _.$(inputTextAreaSelector);
        this.$resultTextArea = _.$(resultTextAreaSelector);
        this.$analysisBtn = _.$(analysisBtnSelector);
        this.$sampleDataWrapper = _.$(sampleWrapSelector);
        this.$resultSummaryWrapper = _.$(resultSummarySelector);

        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.parser = parser;

        this.parseTreeDepth = 0;
    }
    init = () => {
        this.setSampleDataBtn(this.$sampleDataWrapper);
        this.setAnalysisBtnClickEvent(this.$analysisBtn);
    };

    setAnalysisBtnClickEvent = (analysisBtn) =>
        _.ON(analysisBtn, 'click', this.analysisBtnClickEventHandler.bind(this));

    analysisBtnClickEventHandler = () => {
        this.initParseTreeDepth();
        const inputData = this.$inputTextArea.value;
        const tokens = this.tokenizer.createTokens(inputData);
        const lexerTokens = this.lexer.createLexerTokens(tokens);
        const parseTree = this.parser.createParseTree(lexerTokens);

        this.setDepth(parseTree);
        this.renderParseTree(parseTree);
        this.renderParseTreeSummary(this.parseTreeDepth, this.lexer.typeSummary);
    };

    renderParseTree(parseTree) {
        this.$resultTextArea.value = JSON.stringify(parseTree, null, 3);
    };

    renderParseTreeSummary(parseTreeDepth, {stringCount, numberCount} ){
        const template =`<p>배열 중첩 수준 : ${parseTreeDepth}개</p>
        <p>문자열 타입 갯수 ${stringCount}개</p>
        <p>숫자 타입 갯수 ${numberCount}개</p>`;
        this.$resultSummaryWrapper.innerHTML = template;
    };

    initParseTreeDepth = () => ( (this.parseTreeDepth > 0) && (this.parseTreeDepth = 0) );

    setDepth = (parseTree, depth = 0) => {
        if (parseTree.child) {
            depth++;
            parseTree.child.forEach(item => {
                this.setDepth(item, depth);
            })
        }

        if(depth > this.parseTreeDepth){
            this.parseTreeDepth = depth;
        }
    };

    // 샘플 데이터 버튼 생성 & 이벤트 등록(Click)
    setSampleDataBtn = (sampleDataWrapper) => {
        const arrBtnText = Object.keys(sampleData);
        const btnId = "sampleDatas";

        arrBtnText.forEach((btnText) => {
            const btnTemplate = this.createSampleDataBtnTemplate(btnText, btnId);
            sampleDataWrapper.insertAdjacentHTML('beforeend', btnTemplate);
        });

        const sampleDataBtns = _.$$(`#${btnId}`, sampleDataWrapper);
        sampleDataBtns.forEach((sampleDataBtn) => this.setSampleDataBtnClickEvent(sampleDataBtn));
    };

    createSampleDataBtnTemplate = (btnText, btnId) => {
        return `<button class="btn btn-outline-primary btn-sm mr-1" id=${btnId}>
            ${btnText}
        </button>`;
    };

    setSampleDataBtnClickEvent = (sampleDataBtn) => 
        _.ON(sampleDataBtn, 'click', (e) => this.sampleDataBtnClickEventHandler(e));
    sampleDataBtnClickEventHandler = ({target}) => {
        const targetText = target.innerText;
        const value = sampleData[targetText];
        this.$inputTextArea.value = value;
    };
}

export default JSONParser;