import { formatNumber } from '../utils/NumberFormatter.js';

export class AttackCalculator {
  constructor(charLevel, petLevel, weaponLevels, skinBuffs, shrineLevel = 0) {
    this.charLevel = charLevel;
    this.petLevel = petLevel;
    this.weaponLevels = weaponLevels; // { rod: 1, cannon: 2, ... }
    this.skinBuffs = skinBuffs;       // { rod: 10, cannon: 5, ... }
    this.shrineLevel = shrineLevel;   // 0~255
  }

  calculateRaw() {
    // 무기별 계수
    const weaponDpsBase = {
      rod: 0,
      harpoon: 0.02,
      cannon: 0.03,
      machine: 0.05,
      magic: 0.08
    };

    const weaponDpsFactorBase = {
      rod: 0.014,
      harpoon: 0.01,
      cannon: 0.012,
      machine: 0.014,
      magic: 0.016
    };

    // 1. base_dps
    const baseDps = 30 * this.charLevel * Math.pow(1.01, this.charLevel);

    // 2. 펫 계수
    const petMult = 0.0001 * this.petLevel;

    // 3. 의지 신단 계수 (간단화된 pow형)
    const altarMult = 0.00001 * this.shrineLevel;

    // 4. base_tap_dps
    const baseTapDps = baseDps * (1 + petMult) * (1 + altarMult);

    // 5. 무기 DPS 계산
    let weaponTotal = 0;
    for (const weapon in this.weaponLevels) {
      const level = this.weaponLevels[weapon] || 0;
      const base = weaponDpsBase[weapon] || 0;
      const factor = weaponDpsFactorBase[weapon] || 0;
      const skinMult = (this.skinBuffs[weapon] || 0) / 100;

      const weaponDps = baseTapDps * (base + factor * level) * (1 + skinMult);
      weaponTotal += weaponDps;
    }

    // 6. 총 tap_dps
    const tapDps = baseTapDps + weaponTotal;

    // 7. 애니메이션 보정 적용 (96%)
    const realDps = tapDps * 0.96;

    return realDps;
  }

  calculateFormatted(decimals = 2) {
    const raw = this.calculateRaw();
    return formatNumber(raw, decimals);
  }
}
