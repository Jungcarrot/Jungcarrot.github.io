export class UIBuilder {
  static buildAttackUI() {
    return `
      <h2>⚔️ 공격력 계산기</h2>
      <label>캐릭터 레벨: <input id="charLevel" type="number" /></label><br>
      <button id="calculateAttack">계산하기</button>
      <div id="attackResult" style="margin-top:1rem;"></div>
    `;
  }
}
