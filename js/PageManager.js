import { loadAttackPage } from './AttackUIController.js';
import { loadFarmPage } from './FarmUIController.js';
import { loadShrinePage } from './ShrineUIController.js';
import { loadTraitPage } from './TraitUIController.js';

export class PageManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  loadPage(page) {
    switch (page) {
      case 'attack':
        loadAttackPage(this.container);
        break;
      case 'farm':
        loadFarmPage(this.container);
        break;
      case 'shrine':
        loadShrinePage(this.container);
        break;
      case 'trait':
        loadTraitPage(this.container);
        break;
      default:
        this.container.innerHTML = `<p>존재하지 않는 페이지입니다.</p>`;
    }
  }
}
