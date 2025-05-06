export class PetInputHandler {
  constructor(id) {
    this.input = document.getElementById(id);
  }
  getValue() {
    return parseInt(this.input.value) || 0;
  }
}
