export class TraitCalculator {
  constructor(currentLevels, traitData) {
    this.currentLevels = currentLevels;
    this.traitData = traitData;
  }

  // 각 특성별 필요 포인트 계산
  calculateEach() {
    const result = {};
    for (const trait in this.currentLevels) {
      const current = this.currentLevels[trait];
      const costTable = this.traitData[trait];

      if (!costTable) {
        result[trait] = 0;
        continue;
      }

      let total = 0;
      for (let i = current; i < costTable.length; i++) {
        total += costTable[i];
      }
      result[trait] = total;
    }
    return result;
  }

  // 총합 포인트 계산
  calculateTotal() {
    const each = this.calculateEach();
    return Object.values(each).reduce((sum, val) => sum + val, 0);
  }
}
