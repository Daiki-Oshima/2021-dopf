//===============//
// smooth scroll //
//===============//
window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (element) {
    // ナビゲーション内リンクの場合はイベントを追加しない
    if (element.closest("#nav-drawer")) return;

    // トリガーをクリックした時に実行
    element.addEventListener("click", function (e) {
      // スクロール先の要素を取得
      const href = element.getAttribute("href");
      const target = document.getElementById(href.replace("#", ""));

      if (target) {
        // 画面上部から要素までの距離
        const position = target.getBoundingClientRect().top;
        // 現在のスクロール距離
        const offsetTop = window.pageYOffset;
        // スクロール位置に持たせるバッファ
        const buffer = 50;
        const top = position + offsetTop - buffer;
        // デフォルトのイベントをキャンセル
        e.preventDefault();
        e.stopPropagation();

        // スクロールを実行する
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    });
  });
});
