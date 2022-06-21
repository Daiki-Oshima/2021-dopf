// ハンバーガーメニュー
const hamburger = document.getElementById('jsHamburger');
const hamburgerLine = document.querySelectorAll('.l-header__hamburger-line');
const headerNav = document.getElementById('jsNav');
const overlay = document.getElementById('jsOverlay');

hamburger.addEventListener('click', function () {
  // ハンバーガーボタンを変形
  for (let i = 0; i < hamburgerLine.length; i++) {
    hamburgerLine[i].classList.toggle('is-open');
  }
  // ナビゲーションエリアを開閉
  headerNav.classList.toggle('is-open');
  // 背景を固定
  overlay.classList.toggle('is-menuOpen');
});