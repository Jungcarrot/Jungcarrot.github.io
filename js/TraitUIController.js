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
  { key: 'SkillBooster', name: '스킬 부스터', max: 11 }
];

export async function loadTraitPage(container) {
  container.innerHTML = `<h2>특성 포인트 계산기</h2>`;

  // trait_levels.json 불러오기
  const response = await fetch('/js/data/trait_levels.json');
  const traitData = await response.json();

  // 전체 레이아웃: 입력과 결과를 양 옆에 배치
  const layout = document.createElement('div');
  layout.style.display = 'flex';
  layout.style.gap = '2rem';
  layout.style.justifyContent = 'center';
  layout.style.alignItems = 'flex-start';

  // 왼쪽 입력 영역
  const form = document.createElement('div');
  form.style.flex = '1';

  // 오른쪽 결과 영역
  const result = document.createElement('div');
  result.id = 'traitResult';
  result.style.flex = '1';
  result.style.textAlign = 'left';

  // 입력 필드 생성
  traitList.forEach(trait => {
    form.innerHTML += `
      <div class="input-group">
        <label>${trait.name} (최대 ${trait.max}):</label>
        <input type="number" id="trait_${trait.key}" min="0" max="${trait.max}" value="0">
      </div>
    `;
  });

  // 계산 버튼 추가
  form.innerHTML += `<button class="calculate" id="calculateTrait">계산하기</button>`;

  // DOM 구성
  layout.appendChild(form);
  layout.appendChild(result);
  container.appendChild(layout);

  // 계산 버튼 이벤트
  document.getElementById('calculateTrait').addEventListener('click', () => {
    const inputLevels = {};

    traitList.forEach(trait => {
      const input = document.getElementById(`trait_${trait.key}`);
      const level = Math.min(parseInt(input.value) || 0, trait.max);
      inputLevels[trait.key] = level;
    });

    const calculator = new TraitCalculator(inputLevels, traitData);
    const each = calculator.calculateEach();
    const total = calculator.calculateTotal();

    const resultArea = document.getElementById('traitResult');
    resultArea.innerHTML = '';

for (const trait of traitList) {
  const name = trait.name;
  const key = trait.key;
  const current = inputLevels[key];
  const required = each[key];

  resultArea.innerHTML += `
    <div class="trait-row">
      <span class="trait-label">${name} (최대 ${trait.max}):</span>
      <input class="trait-inline-input" type="number" disabled value="${current}" />
      <span class="trait-result">→ 현재 ${current} → 필요 포인트 ${required.toLocaleString()}</span>
    </div>
  `;
}

resultArea.innerHTML += `<hr><div><strong>총 필요 포인트: ${total.toLocaleString()}</strong></div>`;

  });
}
