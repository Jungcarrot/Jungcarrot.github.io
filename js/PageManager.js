import { loadAttackPage } from './AttackUIController.js';

export class PageManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  loadPage(page) {
    switch (page) {
      case 'home':
        this.container.innerHTML = `<h2>계산기를 선택해주세요.</h2>`;
        break;
      case 'attack':
        loadAttackPage(this.container);
        break;
      default:
        this.container.innerHTML = `<p>존재하지 않는 페이지입니다.</p>`;
    }
  }
}
