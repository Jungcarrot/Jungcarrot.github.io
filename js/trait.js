function loadTraitCalculator() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>✨ 특성 포인트 계산기</h2>
    <label>현재 레벨: <input type="number" id="traitCurrent" /></label><br>
    <label>목표 레벨: <input type="number" id="traitTarget" /></label><br>
    <button onclick="calculateTrait()">계산하기</button>
    <div id="traitResult"></div>
  `;
}

function calculateTrait() {
  const cur = parseInt(document.getElementById('traitCurrent').value);
  const target = parseInt(document.getElementById('traitTarget').value);
  let total = 0;
  for (let i = cur; i < target; i++) {
    total += i + 1;
  }
  document.getElementById('traitResult').innerText = `총 필요한 포인트: ${total}개`;
}
