import { TraitCalculator } from './calculator/TraitCalculator.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';

const traitList = [
  { key: 'autoFish', name: '자동낚시', max: 6 },
  { key: 'holder', name: '낚시게이지 홀더', max: 2 },
  { key: 'Stack', name: '고물중첩', max: 14 },
  { key: 'combo', name: '콤보강화', max: 10 },
  { key: 'detector', name: '탐지기강화', max: 10 },
  { key: 'Inventory', name: '보관함증가', max: 14 },
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

  // JSON 불러오기
  const response = await fetch('/js/data/trait_levels.json');
  const traitData = await response.json();

  // 전체 레이아웃
  const layout = document.createElement('div');
  layout.id = 'trait-layout';
  layout.style.display = 'flex';
  layout.style.flexDirection = 'column';
  layout.style.alignItems = 'center';
  layout.style.justifyContent = 'center';
  layout.style.gap = '2rem';

  // 입력폼
  const form = document.createElement('div');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.alignItems = 'center';

  // 결과창
  const result = document.createElement('div');
  result.id = 'traitResult';
  result.style.display = 'none';
  result.style.flex = '1';
  result.style.textAlign = 'left';
  result.style.whiteSpace = 'nowrap';
  result.style.width = '450px';

  // 입력 필드
  traitList.forEach(trait => {
    form.innerHTML += `
      <div class="input-group horizontal">
        <label for="trait_${trait.key}">${trait.name} (최대 ${trait.max}):</label>
        <input type="number" id="trait_${trait.key}" min="0" max="${trait.max}" value="0">
      </div>
    `;
  });

  form.innerHTML += `<button class="calculate" id="calculateTrait">계산하기</button>`;
  layout.appendChild(form);
  layout.appendChild(result);
  container.appendChild(layout);

  // 계산 버튼 클릭 이벤트
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

    // 레이아웃을 좌우 배치로 전환
    const layout = document.getElementById('trait-layout');
    layout.style.flexDirection = 'row';
    layout.style.alignItems = 'flex-start';
    layout.style.justifyContent = 'center';

    // 결과창 표시
    const resultArea = document.getElementById('traitResult');
    resultArea.style.display = 'block';
    resultArea.innerHTML = '';

    traitList.forEach(trait => {
      const current = inputLevels[trait.key];
      const required = each[trait.key];
      resultArea.innerHTML += `<div>${trait.name}: 현재 ${current} → 필요 포인트 ${required.toLocaleString()}</div>`;
    });

    resultArea.innerHTML += `<hr><div><strong>총 필요 포인트: ${total.toLocaleString()}</strong></div>`;
  });
}

