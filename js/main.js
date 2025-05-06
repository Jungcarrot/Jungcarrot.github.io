function showPage(page) {
  const content = document.getElementById('content');
  if (page === 'home') {
    content.innerHTML = `
      <h2>원하는 계산기를 선택하세요.</h2>
      <p>위의 메뉴 버튼을 눌러 계산기를 선택하세요.</p>
    `;
  } else if (page === 'farm') {
    loadFarmCalculator();
  } else if (page === 'attack') {
    loadAttackCalculator();
  } else if (page === 'shrine') {
    loadShrineCalculator();
  } else if (page === 'trait') {
    loadTraitCalculator();
  }
}

window.onload = () => showPage('home');
