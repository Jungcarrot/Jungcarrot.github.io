export class FarmCalculator {
  constructor(currentLevel, targetLevel) {
    this.currentLevel = currentLevel;
    this.targetLevel = targetLevel;
  }

  calculate() {
    let total = 0;
    for (let i = this.currentLevel; i < this.targetLevel; i++) {
      total += 10 * (i + 1); // 예시: i+1 * 10 단위로 증가
    }
    return total;
  }
}
