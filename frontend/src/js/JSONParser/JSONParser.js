import _ from '../util.js';

class JSONParser {
    constructor(parserReference, { tokenizer, lexer, parser }) {
        const {
            inputTextAreaSelector,
            resultTextAreaSelector,
            analysisBtnSelector,
        } = parserReference;
        this.inputTextArea = _.$(inputTextAreaSelector);
        this.resultTextArea = _.$(resultTextAreaSelector);
        this.analysisBtn = _.$(analysisBtnSelector);
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.parser = parser;
    }

    init = () => {
        this.setAnalysisBtnClickEvent(this.analysisBtn);
    };

    setAnalysisBtnClickEvent = (analysisBtn) =>
        _.ON(analysisBtn, 'click', (e) => this.analysisBtnClickEventHandler(e));
    analysisBtnClickEventHandler = () => {
        const testData =
            '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]';
        this.tokenizer.createToken(testData);
        // 임시
        this.resultTextArea.value = this.tokenizer.stack.join(' ');
    };
}

export default JSONParser;