class InputInfoPresentational {
  constructor({ $target }) {
    this.render($target);
  }

  render($target) {
    const $inputInfo_section = document.createElement("section");
    $inputInfo_section.className = "input-info-section";
    $target.appendChild($inputInfo_section);

    const $inputInfo = `<span class="input-info">JSON 데이터를 추가해 주십시오!</span>`;

    $inputInfo_section.insertAdjacentHTML("beforeend", $inputInfo);
  }
}

export default InputInfoPresentational;
