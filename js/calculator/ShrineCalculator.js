export class ShrineCalculator {
  constructor(currentLevel, targetLevel) {
    this.currentLevel = currentLevel;
    this.targetLevel = targetLevel;
  }

  calculate() {
    let total = 0;
    for (let i = this.currentLevel; i < this.targetLevel; i++) {
      total += i + 1; // 예시: 레벨업마다 (i+1)개 필요
    }
    return total;
  }
}
