import _ from '../util.js';

class JSONParser {
    constructor(parserReference, parserModule) {
        const {
            inputTextAreaSelector,
            resultTextAreaSelector,
            analysisBtnSelector,
        } = parserReference;
        this.inputTextArea = _.$(inputTextAreaSelector);
        this.resultTextArea = _.$(resultTextAreaSelector);
        this.analysisBtn = _.$(analysisBtnSelector);

        const {
            tokenizer,
            lexer,
            parser,
        } = parserModule;
        this.tokenizer = tokenizer;
        this.lexer = lexer;
        this.parser = parser;
    }

    init = () => {
        this.setAnalysisBtnClickEvent(this.analysisBtn);
    };

    setAnalysisBtnClickEvent = (analysisBtn) =>
        _.AE(analysisBtn, 'click', (e) => this.analysisBtnClickEventHandler(e));
    analysisBtnClickEventHandler = ({target}) => {
        let result = `{`;
        const tempData = "[1]";
        tempData.split('').forEach((char) => {
        });



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