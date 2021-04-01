import { _ } from '../src/util.js';
import { inputTitle, buttonName, outputTitle } from '../src/const.js';
import Tokenizer from '../src/tokenizer.js';
import Lexer from '../src/lexer.js';
import Parser from '../src/parser.js';
export default class MainView {
  constructor() {
    this.init();
  }
  init() {
    const $root = _.$('#root');
    return ($root.innerHTML = `
        ${this.getInputContainer()}
        ${this.getArrow()}
        ${this.getOutputContainer()}
        `);
  }
  addEvent() {
    this.clickParsingButton();
  }
  clickParsingButton() {
    const $parsingBtn = _.$('#parsing-btn');
    $parsingBtn.addEventListener('click', this.submitData);
  }
  submitData() {
    const $inputData = _.$('#input-data');
    const tokenizer = new Tokenizer($inputData.value);
    const lexer = new Lexer(tokenizer.getTokenList());
    const parse = new Parser(lexer.getLexerList());
    const $outputData = _.$('#output-data');
    $outputData.value = JSON.stringify(parse.parse());
  }
  getInputTitle(title) {
    return `
        <div class="input-container__title">${title}</div>
        `;
  }
  getInputBox() {
    return `
        <div class="input-container__box">
        <input type="text" id="input-data" />
        </div>
        `;
  }
  getInputBtn(buttonName) {
    return `
        <div class="input-container__btn">
        <button id="parsing-btn">${buttonName}</button>
        </div>
        `;
  }
  getInputContainer() {
    return `
        <div class="input-container">
        ${this.getInputTitle(inputTitle)}
        ${this.getInputBox()}
        ${this.getInputBtn(buttonName)}
        </div>`;
  }

  getArrow() {
    return `
        <div>
        <i class="fas fa-arrow-right"></i>
        </div>
        `;
  }

  getOutputTitle(outputTitle) {
    return `
        <div class="output-container__title">${outputTitle}</div>
        `;
  }

  getOutputBox() {
    return `
        <div class="output-container__box">
        <input id="output-data" type="text" />
        </div>
        `;
  }

  getOutputContainer() {
    return `
        <div class="output-container">
        ${this.getOutputTitle(outputTitle)}
        ${this.getOutputBox()}
        </div>
        `;
  }
}
