// AttackUIController.js
import { AttackCalculator } from './calculator/AttackCalculator.js';
import { CharacterInputHandler } from './input/CharacterInputHandler.js';
import { PetInputHandler } from './input/PetInputHandler.js';
import { WeaponInputHandler } from './input/WeaponInputHandler.js';
import { SkinInputHandler } from './input/SkinInputHandler.js';
import { InputValidator } from './ui/InputValidator.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';
import { formatNumber } from './utils/NumberFormatter.js'; // ✅ 추가

export class AttackUIController {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  render() {
    this.container.innerHTML = `
      <h2>공격력 계산기</h2>
      <div class="input-group">
        <label>캐릭터 레벨:</label>
        <input type="number" id="charLevel" min="1" max="4181">
      </div>
      <div class="input-group">
        <label>펫 레벨:</label>
        <input type="number" id="petLevel" min="0" max="4177">
      </div>
      <div class="input-group">
        <label>낚싯대 레벨 / 스킨(%):</label>
        <input type="number" id="rodLevel"> / <input type="number" id="rodSkin">
      </div>
      <div class="input-group">
        <label>작살포탑 레벨 / 스킨(%):</label>
        <input type="number" id="harpoonLevel"> / <input type="number" id="harpoonSkin">
      </div>
      <div class="input-group">
        <label>대포 레벨 / 스킨(%):</label>
        <input type="number" id="cannonLevel"> / <input type="number" id="cannonSkin">
      </div>
      <div class="input-group">
        <label>기관포탑 레벨 / 스킨(%):</label>
        <input type="number" id="machineLevel"> / <input type="number" id="machineSkin">
      </div>
      <div class="input-group">
        <label>마법석 레벨 / 스킨(%):</label>
        <input type="number" id="magicLevel"> / <input type="number" id="magicSkin">
      </div>
      <div class="input-group">
        <label>의지의 신단 레벨 (0~255):</label>
        <input type="number" id="willShrineLevel" min="0" max="255">
      </div>
      <button class="calculate" id="calculateAttack">계산하기</button>
      <div id="attackResult"></div>
    `;

    const char = new CharacterInputHandler('charLevel');
    const pet = new PetInputHandler('petLevel');
    const weapons = new WeaponInputHandler({
      rod: 'rodLevel',
      harpoon: 'harpoonLevel',
      cannon: 'cannonLevel',
      machine: 'machineLevel',
      magic: 'magicLevel',
    });
    const skins = new SkinInputHandler({
      rod: 'rodSkin',
      harpoon: 'harpoonSkin',
      cannon: 'cannonSkin',
      machine: 'machineSkin',
      magic: 'magicSkin',
    });

    document.getElementById('calculateAttack').addEventListener('click', () => {
      const clv = char.getValue();
      const plv = pet.getValue();
      const wlv = weapons.getValues();
      const sbf = skins.getValues();
      const shrineLevel = parseInt(document.getElementById('willShrineLevel').value) || 0;

      if (!InputValidator.isValidLevel(clv, 1, 4181)) return;
      if (!InputValidator.isValidLevel(plv, 0, 4177)) return;
      if (!InputValidator.isValidLevel(shrineLevel, 0, 255)) return;

      const calc = new AttackCalculator(clv, plv, wlv, sbf, shrineLevel);
      const raw = calc.calculateRaw();                            // 원본 숫자
      const formatted = calc.calculateFormatted();                // 축약형

      ResultDisplayer.show('attackResult', `총 공격력: ${formatted} (${raw.toFixed(2)})`);
    });
  }
}

export function loadAttackPage(container) {
  const ui = new AttackUIController(container.id);
  ui.render();
}
