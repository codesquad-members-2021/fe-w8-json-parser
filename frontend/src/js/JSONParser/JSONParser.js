import _ from '../util.js';
import Tokenizer from './partial/Tokenizer.js';
import Lexer from './partial/Lexer.js';
import Parser from './partial/Parser.js';

class JSONParser {
    constructor(parserReference) {
        const {
            inputTextAreaSelector,
            resultTextAreaSelector,
            analysisBtnSelector,
        } = parserReference;
        this.inputTextArea = _.$(inputTextAreaSelector);
        this.resultTextArea = _.$(resultTextAreaSelector);
        this.analysisBtn = _.$(analysisBtnSelector);
    }

    init = () => {
        this.setAnalysisBtnClickEvent(this.analysisBtn);
    };

    setAnalysisBtnClickEvent = (analysisBtn) =>
        _.AE(analysisBtn, 'click', (e) => this.analysisBtnClickEventHandler(e));
    analysisBtnClickEventHandler = ({target}) => {
        console.log(target)
    };
}

export default JSONParser;