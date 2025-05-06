import { TraitCalculator } from './calculator/TraitCalculator.js';
import { TraitInputHandler } from './input/TraitInputHandler.js';
import { InputValidator } from './ui/InputValidator.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';

export function loadTraitPage(container) {
  container.innerHTML = `
    <h2>✨ 특성 포인트 계산기</h2>

    <div class="input-group">
      <label>특성 선택:</label>
      <select id="traitSelect">
        <option value="autoFishing">자동낚시</option>
        <option value="holder">고물중첩</option>
        <option value="combo">콤보강화</option>
        <option value="detector">탐지기강화</option>
        <option value="storage">보관함증가</option>
        <option value="warp">순간이동</option>
        <option value="skillSpeed">낚시속도</option>
        <option value="worldSpeed">세계가속</option>
        <option value="autoCast">스킬자동시전</option>
        <option value="booster">스킬부스터</option>
        <option value="skillPower">스킬강화</option>
        <option value="critical">치명타</option>
        <option value="agility">이동속도</option>
      </select>
    </div>
    <div class="input-group">
      <label>현재 레벨:</label>
      <input type="number" id="traitCurrentLevel">
    </div>
    <div class="input-group">
      <label>목표 레벨:</label>
      <input type="number" id="traitTargetLevel">
    </div>

    <button class="calculate" id="calculateTrait">계산하기</button>
    <div id="traitResult"></div>
  `;

  document.getElementById('calculateTrait').addEventListener('click', () => {
    const handler = new TraitInputHandler('traitSelect', 'traitCurrentLevel', 'traitTargetLevel');
    const { traitName, currentLevel, targetLevel } = handler.getInput();

    const max = TraitInputHandler.getMaxLevel(traitName);

    if (!InputValidator.isValidLevel(currentLevel, 0, max)) return;
    if (!InputValidator.isValidLevel(targetLevel, 1, max)) return;
    if (targetLevel <= currentLevel) {
      alert('목표 레벨은 현재 레벨보다 높아야 합니다.');
      return;
    }

    const calc = new TraitCalculator(currentLevel, targetLevel);
    const result = calc.calculate();

    ResultDisplayer.show('traitResult', `필요한 포인트 수: ${result}개`);
  });
}
