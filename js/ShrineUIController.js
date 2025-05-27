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
      <input type="number" id="shrineCurrentLevel" min="0">
    </div>
    <div class="input-group">
      <label>목표 레벨:</label>
      <input type="number" id="shrineTargetLevel" min="1">
    </div>

    <button class="calculate" id="calculateShrine">계산하기</button>
    <div id="shrineResult"></div>
  `;

  const shrineMaxLevels = {
    growth: 215,
    rich: 190,
    strike: 255,
    sharp: 255,
    will: 255
  };


  const shrineTypeSelect = document.getElementById('shrineType');
  const currentInput = document.getElementById('shrineCurrentLevel');
  const targetInput = document.getElementById('shrineTargetLevel');

  function updateMaxLevel() {
    const selected = shrineTypeSelect.value;
    const max = shrineMaxLevels[selected] || 255;

    currentInput.max = max;
    targetInput.max = max;
    currentInput.placeholder = `0~${max}`;
    targetInput.placeholder = `1~${max}`;
  }

  shrineTypeSelect.addEventListener('change', updateMaxLevel);
  updateMaxLevel(); // 최초 1회 실행

  document.getElementById('calculateShrine').addEventListener('click', async () => {
    const handler = new ShrineInputHandler('shrineType', 'shrineCurrentLevel', 'shrineTargetLevel');
    const { shrineType, currentLevel, targetLevel } = handler.getInput();

    const max = shrineMaxLevels[shrineType] || 255;

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
