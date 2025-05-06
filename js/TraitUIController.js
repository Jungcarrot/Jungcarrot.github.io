import { TraitCalculator } from './calculator/TraitCalculator.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';

const traitList = [
  { key: 'autoFishing', name: '자동낚시', max: 6 },
  { key: 'holder', name: '낚시게이지 홀더', max: 2 },
  { key: 'Overlapping', name: '고물중첩', max: 14 },
  { key: 'combo', name: '콤보강화', max: 10 },
  { key: 'detector', name: '탐지기강화', max: 10 },
  { key: 'storage', name: '보관함증가', max: 14 },
  { key: 'Auto', name: '자동항해', max: 5 },
  { key: 'Teleport', name: '순간이동', max: 10 },
  { key: 'FishingSpeed', name: '스킬강화 낚시속도', max: 10 },
  { key: 'MoveSpeed', name: '스킬강화 이동속도', max: 10 },
  { key: 'WorldSpeed', name: '스킬강화 세계가속', max: 10 },
  { key: 'SkillAuto', name: '스킬 자동 시전', max: 1 },
  { key: 'SkillBooster', name: '스킬 부스터', max: 11 },
];

export function loadTraitPage(container) {
  container.innerHTML = `<h2>✨ 특성 포인트 계산기</h2>`;

  const form = document.createElement('div');

  traitList.forEach(trait => {
    form.innerHTML += `
      <div class="input-group">
        <label>${trait.name} (최대 ${trait.max}):</label>
        <input type="number" id="trait_${trait.key}" min="0" max="${trait.max}" value="0">
      </div>
    `;
  });

  form.innerHTML += `<button class="calculate" id="calculateTrait">계산하기</button>
                     <div id="traitResult" style="margin-top:1rem;"></div>`;

  container.appendChild(form);

  document.getElementById('calculateTrait').addEventListener('click', () => {
    const inputLevels = {};
    const maxLevels = {};

    traitList.forEach(trait => {
      const input = document.getElementById(`trait_${trait.key}`);
      const level = Math.min(parseInt(input.value) || 0, trait.max);
      inputLevels[trait.key] = level;
      maxLevels[trait.key] = trait.max;
    });

    const calculator = new TraitCalculator(inputLevels, maxLevels);
    const each = calculator.calculateEach();
    const total = calculator.calculateTotal();

    const resultArea = document.getElementById('traitResult');
    resultArea.innerHTML = '';

    for (const trait of traitList) {
      resultArea.innerHTML += `<div>${trait.name}: 현재 ${inputLevels[trait.key]} → 필요 포인트 ${each[trait.key]}</div>`;
    }

    resultArea.innerHTML += `<hr><div><strong>총 필요 포인트: ${total}</strong></div>`;
  });
}

