export class ShrineCalculator {
  constructor(currentLevel, targetLevel, shrineType, shrineData) {
    this.currentLevel = currentLevel;
    this.targetLevel = targetLevel;
    this.shrineType = shrineType;
    this.shrineData = shrineData;
  }

  calculate() {
    const levels = this.shrineData[this.shrineType];
    if (!levels) {
      console.error(`신단 데이터 없음: ${this.shrineType}`);
      return 0;
    }

    let total = 0;
    for (let i = this.currentLevel + 1; i <= this.targetLevel; i++) {
      total += levels[i];
    }
    return total;
  }
}
