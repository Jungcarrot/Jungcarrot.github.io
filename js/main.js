import { PageManager } from './PageManager.js';

const manager = new PageManager('content');

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = btn.getAttribute('data-page');
      manager.loadPage(page);
    });
  });

    const homeBtn = document.getElementById('homeButton');
  if (homeBtn) {
    homeBtn.addEventListener('click', () => {
      manager.loadPage('home');
    });
  }

  manager.loadPage('home');
});
