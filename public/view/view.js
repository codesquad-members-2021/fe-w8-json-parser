import { _ } from '../src/util.js';
import { inputTitle, buttonName, outputTitle } from '../src/const.js';
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
  getInputTitle(title) {
    return `
        <div class="input-container__title">${title}</div>
        `;
  }
  getInputBox() {
    return `
        <div class="input-container__box">
        <input type="text" />
        </div>
        `;
  }
  getInputBtn(buttonName) {
    return `
        <div class="input-container__btn">
        <button>${buttonName}</button>
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
        <input type="text" />
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
