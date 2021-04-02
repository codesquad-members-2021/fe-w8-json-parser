class AnalysisButtonPresentational {
  constructor({ $target, buttonStatus, onClickAnalysisButton }) {
    this.render($target, buttonStatus, onClickAnalysisButton);
  }

  addEvent({ $target, onClickAnalysisButton }) {
    $target.addEventListener("click", () => onClickAnalysisButton());
  }

  render($target, buttonStatus, onClickAnalysisButton) {
    const $analysisButton_section = document.createElement("section");
    $analysisButton_section.className = "analysis-button-section";
    $target.appendChild($analysisButton_section);

    const $analysisButton = `<button class="analysis-button" ${buttonStatus ? "disabled" : ""}>분석하기</button>`;
    $analysisButton_section.insertAdjacentHTML("beforeend", $analysisButton);

    this.addEvent({ $target: $analysisButton_section, onClickAnalysisButton });
  }
}

export default AnalysisButtonPresentational;
