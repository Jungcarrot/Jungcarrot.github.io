import { TraitCalculator } from './calculator/TraitCalculator.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';
import { InputValidator } from './ui/InputValidator.js';

const STORAGE_KEY = 'traitInputs';

// 특성 목록 정의
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

  // JSON 데이터 로드
  const response = await fetch('/js/data/trait_levels.json');
  const traitData = await response.json();

  // 레이아웃 구성
  const layout = document.createElement('div');
  layout.id = 'trait-layout';
  layout.style.display = 'flex';
  layout.style.flexDirection = 'column';
  layout.style.alignItems = 'center';
  layout.style.justifyContent = 'center';
  layout.style.gap = '2rem';

  const form = document.createElement('div');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';
  form.style.alignItems = 'center';

  const result = document.createElement('div');
  result.id = 'traitResult';
  result.style.display = 'none';
  result.style.flex = '1';
  result.style.textAlign = 'left';
  result.style.whiteSpace = 'nowrap';
  result.style.width = '450px';

  // 입력 필드 렌더링
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

  // 저장된 값 복원
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (saved) {
    for (const trait of traitList) {
      const input = document.getElementById(`trait_${trait.key}`);
      if (saved[trait.key] !== undefined) {
        input.value = saved[trait.key];
      }
    }
  }

  // 계산 버튼 이벤트
  document.getElementById('calculateTrait').addEventListener('click', () => {
    const inputLevels = {};

    // 입력값 수집 및 유효성 검사
    for (const trait of traitList) {
      const input = document.getElementById(`trait_${trait.key}`);
      const value = parseInt(input.value) || 0;

      if (!InputValidator.isValidLevel(value, 0, trait.max, trait.name)) return;

      inputLevels[trait.key] = value;
    }

    // 입력값 저장
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputLevels));

    //  계산 및 결과 표시
    const calculator = new TraitCalculator(inputLevels, traitData);
    const each = calculator.calculateEach();
    const total = calculator.calculateTotal();

    const layout = document.getElementById('trait-layout');
    layout.style.flexDirection = 'row';
    layout.style.alignItems = 'flex-start';
    layout.style.justifyContent = 'center';

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
