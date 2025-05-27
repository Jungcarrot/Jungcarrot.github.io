import { InputValidator } from './ui/InputValidator.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';
import { ShrineCalculator } from './calculator/ShrineCalculator.js';
import { ShrineInputHandler } from './input/ShrineInputHandler.js';

async function loadShrineData() {
  const response = await fetch('./data/shrineData.json');
  return await response.json();
}

export function loadShrinePage(container) {
  container.innerHTML = `
    <h2>신단 레벨 계산기</h2>

    <div class="input-group">
      <label>신단 종류:</label>
      <select id="shrineType">
        <option value="growth">성장의 신단</option>
        <option value="rich">풍요의 신단</option>
        <option value="strike">강타의 신단</option>
        <option value="sharp">예리의 신단</option>
        <option value="will">의지의 신단</option>
      </select>
    </div>
    <div class="input-group">
      <label>현재 레벨:</label>
      <input type="number" id="shrineCurrentLevel">
    </div>
    <div class="input-group">
      <label>목표 레벨:</label>
      <input type="number" id="shrineTargetLevel">
    </div>

    <button class="calculate" id="calculateShrine">계산하기</button>
    <div id="shrineResult"></div>
  `;

  document.getElementById('calculateShrine').addEventListener('click', async () => {
    const handler = new ShrineInputHandler('shrineType', 'shrineCurrentLevel', 'shrineTargetLevel');
    const { shrineType, currentLevel, targetLevel } = handler.getInput();

    const max = ShrineInputHandler.getMaxLevel(shrineType);
    if (!InputValidator.isValidLevel(currentLevel, 0, max)) return;
    if (!InputValidator.isValidLevel(targetLevel, 1, max)) return;
    if (targetLevel <= currentLevel) {
      alert('목표 레벨은 현재 레벨보다 높아야 합니다.');
      return;
    }

    const shrineData = await loadShrineData();
    const calc = new ShrineCalculator(currentLevel, targetLevel, shrineType, shrineData);
    const result = calc.calculate();

    ResultDisplayer.show('shrineResult', `필요한 호박석: ${result}개`);
  });
}
