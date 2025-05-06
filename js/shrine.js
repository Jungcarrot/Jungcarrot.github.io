function loadShrineCalculator() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>⛩️ 신단 레벨 계산기</h2>
    <label>신단 종류: 
      <select id="shrineType">
        <option value="growth">성장의 신단</option>
        <option value="rich">풍요의 신단</option>
        <option value="strike">강타의 신단</option>
        <option value="sharp">예리의 신단</option>
        <option value="will">의지의 신단</option>
      </select>
    </label><br>
    <label>현재 레벨: <input type="number" id="shrineCurrent" /></label><br>
    <label>목표 레벨: <input type="number" id="shrineTarget" /></label><br>
    <button onclick="calculateShrine()">계산하기</button>
    <div id="shrineResult"></div>
  `;
}

function calculateShrine() {
  const cur = parseInt(document.getElementById('shrineCurrent').value);
  const target = parseInt(document.getElementById('shrineTarget').value);
  let total = 0;
  for (let i = cur; i < target; i++) {
    total += i + 1; // 임시 로직
  }
  document.getElementById('shrineResult').innerText = `필요한 호박석: ${total}개`;
}
