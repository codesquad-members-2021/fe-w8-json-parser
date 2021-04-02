import OutputPresentational from "./outputPresentational.js";
import "./output.scss";

class OutputContainer {
  constructor({ $target, model }) {
    this.model = model;
    this.presentationals = null;
    this.stringifiedData = "";

    this.$output = document.createElement("section");
    this.$output.className = "output-section";
    $target.appendChild(this.$output);

    this.model.subscribe(this.updateLog.bind(this));
    this.setState();
  }

  setState() {
    this.render();
  }

  updateLog(stringifiedData) {
    this.stringifiedData = stringifiedData;
    this.setState();
  }

  render() {
    this.presentationals = {
      output: new OutputPresentational({
        $target: this.$output,
        stringifiedData: this.stringifiedData,
      }),
    };
  }
}

export default OutputContainer;
