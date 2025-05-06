export class AttackCalculator {
  constructor(charLevel, petLevel, weaponLevels, skinBuffs, shrineLevel = 0) {
    this.charLevel = charLevel;
    this.petLevel = petLevel;
    this.weaponLevels = weaponLevels; // { rod: 1, cannon: 2, ... }
    this.skinBuffs = skinBuffs;       // { rod: 10, cannon: 5, ... }
    this.shrineLevel = shrineLevel;   // 0~255
  }

  calculate() {
    const base = 30 * this.charLevel * Math.pow(1.01, this.charLevel);
    const petBonus = this.petLevel * 2;

    let weaponTotal = 0;
    for (const key in this.weaponLevels) {
      const level = this.weaponLevels[key];
      const buff = this.skinBuffs[key] || 0;
      const weaponBase = level * 3; // 예시: 무기 레벨 * 3
      const buffed = weaponBase * (1 + buff / 100);
      weaponTotal += buffed;
    }

    const shrineBonus = base * (this.shrineLevel * 0.005); // 0.5% per level

    return base + petBonus + weaponTotal + shrineBonus;
  }
}
