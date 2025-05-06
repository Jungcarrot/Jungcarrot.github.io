export class TraitCalculator {
  constructor(currentLevel, targetLevel) {
    this.currentLevel = currentLevel;
    this.targetLevel = targetLevel;
  }

  calculate() {
    let total = 0;
    for (let i = this.currentLevel; i < this.targetLevel; i++) {
      total += i + 1;
    }
    return total;
  }
}
