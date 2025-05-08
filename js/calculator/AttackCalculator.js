
import { formatNumber } from '../utils/NumberFormatter.js';


export class AttackCalculator {
  constructor(charLevel, petLevel, weaponLevels, skinBuffs, shrineLevel = 0) {
    this.charLevel = charLevel;
    this.petLevel = petLevel;
    this.weaponLevels = weaponLevels; // { rod: 1, cannon: 2, ... }
    this.skinBuffs = skinBuffs;       // { rod: 10, cannon: 5, ... }
    this.shrineLevel = shrineLevel;   // 0~255
  }

  /**
   * 원본 숫자 형태로 계산 결과 반환
   */
  calculateRaw() {
    const base = 30 * this.charLevel * Math.pow(1.01, this.charLevel);
    const petBonus = this.petLevel * 2;

    let weaponTotal = 0;
    for (const key in this.weaponLevels) {
      const level = this.weaponLevels[key];
      const buff = this.skinBuffs[key] || 0;
      const weaponBase = level * 3;
      const buffed = weaponBase * (1 + buff / 100);
      weaponTotal += buffed;
    }

    const shrineBonus = base * (this.shrineLevel * 0.005);
    return base + petBonus + weaponTotal + shrineBonus;
  }

  /**
   * 단위가 축약된 문자열 형태로 결과 반환
   */
  calculateFormatted(decimals = 2) {
    const raw = this.calculateRaw();
    return formatNumber(raw, decimals);
  }
}
