function loadAttackCalculator() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>⚔️ 공격력 계산기</h2>
    <label>캐릭터 레벨: <input type="number" id="charLevel" min="0" max="4181" /></label><br>
    <label>펫 레벨: <input type="number" id="petLevel" min="0" max="4177" /></label><br>
    <label>낚싯대 레벨: <input type="number" id="rodLevel" /></label>
    <label>스킨 공격력 (%): <input type="number" id="rodSkin" /></label><br>
    <button onclick="calculateAttack()">계산하기</button>
    <div id="attackResult"></div>
  `;
}

function calculateAttack() {
  const lv = parseInt(document.getElementById('charLevel').value);
  const atk = 30 * lv * Math.pow(1.01, lv);
  document.getElementById('attackResult').innerText = `계산된 공격력: ${atk.toFixed(2)}`;
}
