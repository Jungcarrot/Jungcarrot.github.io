import { UIBuilder } from './ui/UIBuilder.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';
import { InputValidator } from './ui/InputValidator.js';
import { CharacterInputHandler } from './input/CharacterInputHandler.js';
import { AttackCalculator } from './calculator/AttackCalculator.js';

export class PageManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  loadPage(page) {
    if (page === 'home') {
      this.container.innerHTML = `<h2>계산기를 선택해주세요.</h2>`;
    } else if (page === 'attack') {
      this.loadAttackPage();
    }
    // 농장, 신단, 특성도 이후 구현 가능
  }

  loadAttackPage() {
    this.container.innerHTML = UIBuilder.buildAttackUI();
    const charHandler = new CharacterInputHandler('charLevel');
    const calc = new AttackCalculator();

    document.getElementById('calculateAttack').addEventListener('click', () => {
      const charLevel = charHandler.getLevel();
      if (!InputValidator.isValidLevel(charLevel, 1, 4181)) return;
      const result = calc.calculate(charLevel);
      ResultDisplayer.show('attackResult', `총 공격력: ${result.toFixed(2)}`);
    });
  }
}
