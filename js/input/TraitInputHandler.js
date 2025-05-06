export class TraitInputHandler {
  constructor(selectId, currentId, targetId) {
    this.select = document.getElementById(selectId);
    this.current = document.getElementById(currentId);
    this.target = document.getElementById(targetId);
  }

  getInput() {
    const traitName = this.select.value;
    const currentLevel = parseInt(this.current.value);
    const targetLevel = parseInt(this.target.value);
    return { traitName, currentLevel, targetLevel };
  }

  static getMaxLevel(traitName) {
    const traitMax = {
      autoFishing: 6, holder: 2, combo: 14, detector: 10, storage: 10,
      warp: 14, skillSpeed: 5, worldSpeed: 10, autoCast: 10, booster: 10,
      skillPower: 10, critical: 1, agility: 11
    };
    return traitMax[traitName] || 0;
  }
}
