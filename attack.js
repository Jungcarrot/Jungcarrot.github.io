export function loadAttackCalculator() {
  const area = document.getElementById('calculator-area');
  area.innerHTML = `
    <h2>⚔️ 공격력 계산기</h2>
    <label>플레이어 레벨: <input type="number" id="playerLevel" value="50"></label><br>
    <label>펫 레벨: <input type="number" id="petLevel" value="40"></label><br>
    <h3>무기 레벨과 스킨 버프 (%)</h3>
    <div id="weaponInputs"></div>
    <button onclick="calculateAttack()">계산하기</button>
    <div id="attackResult" style="margin-top:1rem;"></div>
  `;

  const weapons = ["검", "활", "총", "창", "망치"];
  const container = document.getElementById("weaponInputs");
  weapons.forEach(weapon => {
    container.innerHTML += `
      <div style="margin: 0.5rem 0;">
        <label>${weapon} 레벨: <input type="number" id="${weapon}_level" value="10"></label>
        <label>${weapon} 스킨 버프(%): <input type="number" id="${weapon}_buff" value="20"></label>
      </div>
    `;
  });
}

window.calculateAttack = function () {
  const weapons = ["검", "활", "총", "창", "망치"];
  const playerLevel = parseInt(document.getElementById("playerLevel").value) || 0;
  const petLevel = parseInt(document.getElementById("petLevel").value) || 0;

  let weaponDamage = 0;
  weapons.forEach(weapon => {
    const level = parseInt(document.getElementById(`${weapon}_level`).value) || 0;
    const buff = parseFloat(document.getElementById(`${weapon}_buff`).value) || 0;
    weaponDamage += level * 10 * (1 + buff / 100);
  });

  const total = playerLevel * 5 + petLevel * 1.2 + weaponDamage;
  document.getElementById("attackResult").innerText = `총 공격력: ${total.toFixed(2)}`;
}
