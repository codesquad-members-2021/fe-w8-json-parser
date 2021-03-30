import JSONParser from "./JSONParser/JSONParser.js";

const REFERENCE = {
    inputTextAreaSelector: '.json-container__input',
    resultTextAreaSelector: '.result-container__result__detail',
    analysisBtnSelector: '.json-container__btn',
};

new JSONParser(REFERENCE).init();