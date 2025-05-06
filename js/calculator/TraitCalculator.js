export class TraitCalculator {
  constructor(traitLevels, traitMaxLevels) {
    this.traitLevels = traitLevels;       // { traitName: currentLevel, ... }
    this.traitMaxLevels = traitMaxLevels; // { traitName: maxLevel, ... }
  }

  // 각 특성의 필요 포인트 계산
  calculateEach() {
    const result = {};
    for (const trait in this.traitLevels) {
      const current = this.traitLevels[trait];
      const max = this.traitMaxLevels[trait];

      let total = 0;
      for (let i = current; i < max; i++) {
        total += i + 1;
      }
      result[trait] = total;
    }
    return result;
  }

  // 전체 특성 합산
  calculateTotal() {
    const each = this.calculateEach();
    return Object.values(each).reduce((sum, val) => sum + val, 0);
  }
}
