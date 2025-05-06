export class CharacterInputHandler {
  constructor(inputId) {
    this.input = document.getElementById(inputId);
  }

  getLevel() {
    return parseInt(this.input.value);
  }
}
