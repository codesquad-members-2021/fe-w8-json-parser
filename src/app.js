import InputContainer from "./components/input/inputContainer.js";
import OutputContainer from "./components/output/outputContainer.js";
import Model from "./components/observable/model.js";

export default class App {
  constructor({ $target }) {
    this.components = null;

    this.setState($target);
  }

  setState($target) {
    this.render($target);
  }

  render($target) {
    const model = new Model();
    const outputContainer = new OutputContainer({ $target, model });
    const inputContainer = new InputContainer({ $target, model });

    this.components = { inputContainer, outputContainer };
  }
}
