function showPage(page) {
  const content = document.getElementById('content');
  if (page === 'home') {
    content.innerHTML = `
      <h2>원하는 계산기를 선택하세요.</h2>
      <p>위의 메뉴 버튼을 눌러 계산기를 선택하세요.</p>
    `;
  } else if (page === 'farm') {
    content.innerHTML = `
      <h2>🌾 농장 스킨 레벨 계산기</h2>
      <label>현재 레벨: <input type="number" id="farmCurrent" min="0" max="9" /></label><br>
      <label>목표 레벨: <input type="number" id="farmTarget" min="1" max="10" /></label><br>
      <button onclick="calculateFarm()">계산하기</button>
      <div id="farmResult"></div>
    `;
  } else if (page === 'attack') {
    content.innerHTML = `
      <h2>⚔️ 공격력 계산기</h2>
      <label>캐릭터 레벨: <input type="number" id="charLevel" min="0" max="4181" /></label><br>
      <label>펫 레벨: <input type="number" id="petLevel" min="0" max="4177" /></label><br>
      <label>무기별 레벨과 스킨 공격력(%) 입력:<br>
        예시: 낚싯대 <input id="rodLevel" type="number" /> / 스킨 <input id="rodSkin" type="number" />%
      </label><br>
      <button onclick="calculateAttack()">계산하기</button>
      <div id="attackResult"></div>
    `;
  } else if (page === 'shrine') {
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
  } else if (page === 'trait') {
    content.innerHTML = `
      <h2>✨ 특성 포인트 계산기</h2>
      <label>현재 레벨: <input type="number" id="traitCurrent" /></label><br>
      <label>목표 레벨: <input type="number" id="traitTarget" /></label><br>
      <button onclick="calculateTrait()">계산하기</button>
      <div id="traitResult"></div>
    `;
  }
}

function calculateFarm() {
  const cur = parseInt(document.getElementById('farmCurrent').value);
  const target = parseInt(document.getElementById('farmTarget').value);
  let total = 0;
  for (let i = cur; i < target; i++) total += 10 * (i + 1); // 예시 로직
  document.getElementById('farmResult').innerText = `필요한 자원: ${total}개`;
}

function calculateAttack() {
  const lv = parseInt(document.getElementById('charLevel').value);
  const atk = 30 * lv * Math.pow(1.01, lv); // 기본 공식
  document.getElementById('attackResult').innerText = `계산된 공격력: ${atk.toFixed(2)}`;
}

function calculateShrine() {
  const cur = parseInt(document.getElementById('shrineCurrent').value);
  const target = parseInt(document.getElementById('shrineTarget').value);
  let total = 0;
  for (let i = cur; i < target; i++) total += i + 1; // 예시로 단순 증가
  document.getElementById('shrineResult').innerText = `필요한 호박석: ${total}개`;
}

function calculateTrait() {
  const cur = parseInt(document.getElementById('traitCurrent').value);
  const target = parseInt(document.getElementById('traitTarget').value);
  let total = 0;
  for (let i = cur; i < target; i++) total += i + 1;
  document.getElementById('traitResult').innerText = `총 필요한 포인트: ${total}개`;
}

window.onload = () => showPage('home');
