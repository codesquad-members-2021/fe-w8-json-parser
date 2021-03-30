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
        const testData =
            '["1a3",[null,false,["11",[112233],{"easy" : ["hello", {"a":"a"}, "world"]},112],55, "99"],{"a":"str", "b":[912,[5656,33],{"key" : "innervalue", "newkeys": [1,2,3,4,5]}]}, true]';
        const test = this.tokenizer.getTokenType(testData);
        console.log(test);
    };

    setAnalysisBtnClickEvent = (analysisBtn) =>
        _.ON(analysisBtn, 'click', (e) => this.analysisBtnClickEventHandler(e));
    analysisBtnClickEventHandler = ({ target }) => {
        let result = `{`;
        const tempData = '[1]';
        tempData.split('').forEach((char) => {});

        /*
        {
            "type": "array",
            "child": [
                {
                    "value": 1,
                    "type": "number"
                },
            ]
        */
    };
}

export default JSONParser;
