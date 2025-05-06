import { InputValidator } from './ui/InputValidator.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';
import { FarmCalculator } from './calculator/FarmCalculator.js';
import { FarmLevelInputHandler } from './input/FarmLevelInputHandler.js';

export function loadFarmPage(container) {
  container.innerHTML = `
    <h2>🌾 농장 스킨 레벨 계산기</h2>

    <div class="input-group">
      <label>현재 스킨 레벨 (0~9):</label>
      <input type="number" id="farmCurrentLevel" min="0" max="9">
    </div>
    <div class="input-group">
      <label>목표 스킨 레벨 (1~10):</label>
      <input type="number" id="farmTargetLevel" min="1" max="10">
    </div>

    <button class="calculate" id="calculateFarm">계산하기</button>
    <div id="farmResult"></div>
  `;

  document.getElementById('calculateFarm').addEventListener('click', () => {
    const inputHandler = new FarmLevelInputHandler('farmCurrentLevel', 'farmTargetLevel');
    const { current, target } = inputHandler.getLevels();

    if (!InputValidator.isValidLevel(current, 0, 9)) return;
    if (!InputValidator.isValidLevel(target, 1, 10)) return;
    if (target <= current) {
      alert("목표 레벨은 현재 레벨보다 높아야 합니다.");
      return;
    }

    const calc = new FarmCalculator(current, target);
    const result = calc.calculate();

    ResultDisplayer.show('farmResult', `필요한 재료 수: ${result}개`);
  });
}
