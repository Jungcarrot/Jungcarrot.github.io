export class FarmLevelInputHandler {
  constructor(currentId, targetId) {
    this.currentInput = document.getElementById(currentId);
    this.targetInput = document.getElementById(targetId);
  }

  getLevels() {
    const current = parseInt(this.currentInput.value);
    const target = parseInt(this.targetInput.value);
    return { current, target };
  }
}
