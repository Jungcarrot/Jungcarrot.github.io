export class FarmCalculator {
  constructor(currentLevel, targetLevel, category, skinName, materialData) {
    this.currentLevel = currentLevel;
    this.targetLevel = targetLevel;
    this.category = category;
    this.skinName = skinName;
    this.materialData = materialData;
  }

  calculate() {
    const materials = this.materialData[this.category]?.[this.skinName];
    if (!materials) return {};

    const totalMaterials = {};

    for (let i = this.currentLevel; i < this.targetLevel; i++) {
      const levelMaterials = materials[i];
      if (!levelMaterials) continue;

      for (const [material, amount] of Object.entries(levelMaterials)) {
        totalMaterials[material] = (totalMaterials[material] || 0) + amount;
      }
    }

    return totalMaterials; // 예시: { 나무판자: 35, 흑요석: 12 }
  }
}
