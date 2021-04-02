import InputPresentational from "./inputPresentational.js";
import { tokenize } from "../json-parser/tokenizer.js";
import { lexicalize } from "../json-parser/lexer.js";
import { parse } from "../json-parser/parser.js";
import { go } from "../../utils/utils.js";
import "./input.scss";

class InputContainer {
  constructor({ $target, model }) {
    this.model = model;
    this.presentationals = null;
    this.buttonStatus = true;

    this.$input = document.createElement("section");
    this.$input.className = "input-section";
    $target.appendChild(this.$input);

    this.setState();
  }

  setState() {
    this.render();
  }

  handleUserInput() {
    const inputValue = this.getInputValue();
    this.buttonStatus = inputValue.length ? false : true;
    this.$input.querySelector(".analysis-button").disabled = this.buttonStatus;
  }

  handleAnalysisButton() {
    const inputValue = this.getInputValue();
    const parsedData = go(inputValue, tokenize, lexicalize, parse);
    const stringifiedData = JSON.stringify(parsedData, null, " ");
    this.model.notify(stringifiedData);
  }

  getInputValue() {
    return this.$input.querySelector(".user-input").value;
  }

  render() {
    this.presentationals = {
      input: new InputPresentational({
        $target: this.$input,
        buttonStatus: this.buttonStatus,
        onKeyupUserInput: this.handleUserInput.bind(this),
        onClickAnalysisButton: this.handleAnalysisButton.bind(this),
      }),
    };
  }
}

export default InputContainer;
