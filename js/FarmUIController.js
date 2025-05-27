import { InputValidator } from './ui/InputValidator.js';
import { ResultDisplayer } from './ui/ResultDisplayer.js';
import { FarmCalculator } from './calculator/FarmCalculator.js';
import { FarmLevelInputHandler } from './input/FarmLevelInputHandler.js';

export async function loadFarmPage(container) {
  container.innerHTML = `<h2>농장 스킨 레벨 계산기</h2>`;

  // JSON 데이터 로드
  const response = await fetch('/js/data/farm_materials.json');
  const materialData = await response.json();

  // 상위 카테고리 & 하위 스킨 정의
  const categoryOptions = ['건물', '마당', '계단', '통발', '기타'];
  const skinOptions = {
    건물: ['움막', '포장마차', '석조하우스', '해상 카페', '마녀의 집', '스팀하우스'],
    마당: ['도마', '간판문어', '석조별장', '파라솔', '마녀솥', '조명장치'],
    계단: ['허름한 부두', '구름다리', '대리석 계단', '카페 입구', '흑요석 제단', '흑철 제단'],
    통발: ['양어장', '어묵바구니', '대리석 그릇', '레모네이드 컵', '바다의 비석', '테슬라 양어 장치'],
    기타: ['룰렛', '두더지 잡기']
  };

  const buildSelect = (id, options) => `
    <select id="${id}">
      ${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
    </select>
  `;

  container.innerHTML += `
    <div class="input-group">
      <label>스킨 종류:</label>
      ${buildSelect('farmCategory', categoryOptions)}
    </div>
    <div class="input-group">
      <label>세부 스킨:</label>
      ${buildSelect('farmSkin', skinOptions[categoryOptions[0]])}
    </div>
    <div class="input-group">
      <label>현재 스킨 레벨 (0~9):</label>
      <input type="number" id="farmCurrentLevel" min="0" max="9">
    </div>
    <div class="input-group">
      <label>목표 스킨 레벨 (0~9):</label>
      <input type="number" id="farmTargetLevel" min="0" max="9">
    </div>

    <button class="calculate" id="calculateFarm">계산하기</button>
    <div id="farmResult" style="margin-top: 1rem;"></div>
  `;

  // 스킨 종류 변경 시 하위 스킨 갱신
  document.getElementById('farmCategory').addEventListener('change', (e) => {
    const selected = e.target.value;
    const skinSelect = document.getElementById('farmSkin');
    skinSelect.innerHTML = skinOptions[selected].map(skin => `<option value="${skin}">${skin}</option>`).join('');
  });

  document.getElementById('calculateFarm').addEventListener('click', () => {
    const current = parseInt(document.getElementById('farmCurrentLevel').value);
    const target = parseInt(document.getElementById('farmTargetLevel').value);
    const category = document.getElementById('farmCategory').value;
    const skin = document.getElementById('farmSkin').value;

    if (!InputValidator.isValidLevel(current, 0, 9, '현재 레벨')) return;
    if (!InputValidator.isValidLevel(target, 0, 9, '목표 레벨')) return;
    if (target <= current) {
      alert('목표 레벨은 현재 레벨보다 높아야 합니다.');
      return;
    }

    const calc = new FarmCalculator(current, target, category, skin, materialData);
    const result = calc.calculate(); // { 나무판자: 20, 흑요석: 5 }

    let resultText = `${category} > ${skin}<br>필요한 재료:<br>`;
    for (const [material, amount] of Object.entries(result)) {
      resultText += `- ${material}: ${amount.toLocaleString()}개<br>`;
    }

    ResultDisplayer.show('farmResult', resultText);
  });
}
