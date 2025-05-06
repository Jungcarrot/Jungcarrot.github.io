export class AttackCalculator {
  constructor(charLevel, petLevel, weaponLevels, skinBuffs) {
    this.charLevel = charLevel;
    this.petLevel = petLevel;
    this.weaponLevels = weaponLevels; // { rod: 10, cannon: 5, ... }
    this.skinBuffs = skinBuffs;       // { rod: 10, cannon: 5, ... } (percent)
  }

  calculate() {
    const base = 30 * this.charLevel * Math.pow(1.01, this.charLevel);
    const petBonus = this.petLevel * 2;

    let weaponTotal = 0;
    for (const type in this.weaponLevels) {
      const level = this.weaponLevels[type];
      const buff = this.skinBuffs[type] || 0;
      weaponTotal += level * (1 + buff / 100);
    }

    return base + petBonus + weaponTotal;
  }
}

