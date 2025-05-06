function loadFarmCalculator() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>🌾 농장 스킨 레벨 계산기</h2>
    <label>현재 레벨: <input type="number" id="farmCurrent" min="0" max="9" /></label><br>
    <label>목표 레벨: <input type="number" id="farmTarget" min="1" max="10" /></label><br>
    <button onclick="calculateFarm()">계산하기</button>
    <div id="farmResult"></div>
  `;
}

function calculateFarm() {
  const cur = parseInt(document.getElementById('farmCurrent').value);
  const target = parseInt(document.getElementById('farmTarget').value);
  let total = 0;
  for (let i = cur; i < target; i++) {
    total += 10 * (i + 1); // 임시 계산 로직
  }
  document.getElementById('farmResult').innerText = `필요한 자원: ${total}개`;
}
