/*
 * 初期化
 * -------------------------------------------------------------------
 */
window.addEventListener("DOMContentLoaded", function () {
  // ドロワーメニューを初期化
  new DrawerMenu();
});
/*
 * ドロワーメニュー
 * -------------------------------------------------------------------
 */
class DrawerMenu {
  constructor(options) {
    // ヘッダー
    this.header = document.getElementById("nav-header");
    // ドロワーメニュー
    this.drawer = document.getElementById("nav-drawer");
    // ドロワーメニューの背景
    this.drawerOverlay = document.getElementById("nav-drawer-overlay");
    // ドロワーメニュー内のリンク
    this.drawerLink = document.getElementsByClassName("js-nav-drawer-link");
    // ドロワーメニューの開くボタン
    this.drawerOpen = document.getElementsByClassName("js-nav-drawer-open");
    // ドロワーメニューの閉じるボタン
    this.drawerClose = document.getElementById("nav-drawer-close");
    // ドロワーメニューの開閉スピード
    this.toggleDuration = 500;

    if (!this.drawer) return;
    if (!this.drawerOpen) return;
    if (!this.drawerClose) return;

    /*
     * ドロワーメニューの開閉スピードの設定
     */
    document.documentElement.style.setProperty(
      "--nav-drawer-duration",
      `${this.toggleDuration}ms`
    );

    /*
     *イベントハンドラの設定
     */
    // ドロワーメニューを開く
    for (var i = 0; i < this.drawerOpen.length; i++) {
      this.drawerOpen[i].addEventListener(
        "click",
        this.NavDrawerOpen.bind(this),
        false
      );
    }
    // ドロワーメニューを閉じる
    this.drawerClose.addEventListener(
      "click",
      this.NavDrawerClose.bind(this),
      false
    );
    // 背景部分をクリック
    this.drawerOverlay.addEventListener(
      "click",
      this.NavDrawerClose.bind(this),
      false
    );
  }

  /**
   * ドロワーメニューを開く
   */
  NavDrawerOpen() {
    // ドロワーメニューの背景を固定する
    this.NavBackFace(true);
    // ドロワーメニュー内リンクにイベントを登録
    for (var i = 0; i < this.drawerLink.length; i++) {
      this.drawerLink[i].removeEventListener("click", this.NavDrawerClose);
      this.drawerLink[i].addEventListener(
        "click",
        this.NavDrawerClose.bind(this)
      );
    }
    // ドロワーメニューを表示にする
    this.drawer.style.display = "block";
    this.drawer.setAttribute("data-open", true);
  }

  /**
   * ドロワーメニューを閉じる
   */
  NavDrawerClose() {
    // "data-open"属性を設定
    this.drawer.setAttribute("data-open", false);
    // ドロワーメニューの背景の固定を解除する
    this.NavBackFace(false);
    // ドロワーメニュー内リンクのイベントを削除
    for (var i = 0; i < this.drawerLink.length; i++) {
      this.drawerLink[i].removeEventListener("click", this.NavDrawerClose);
    }
    // ドロワーメニューを非表示にする
    setTimeout(() => {
      this.drawer.style.display = "none";
    }, this.toggleDuration);
  }

  /**
   * ドロワーメニューの背景を制御する
   * @param fixed (true:OPEN false:close)
   */
  NavBackFace(fixed) {
    // 背面固定する対象の要素決定する
    const scrollingElement = () => {
      const browser = window.navigator.userAgent.toLowerCase();
      // document.scrollingElementが有効なブラウザ
      if ("scrollingElement" in document) {
        return document.scrollingElement;
      }
      // iOSの場合はbody要素を選択する
      if (browser.indexOf("webkit") > 0) {
        return document.body;
      }
      // その他はhtml要素を選択する
      return document.documentElement;
    };

    // 1.スクロール非表示の際に発生する背景のガタつきを無くす
    // (スクロールバーの幅を計測してbody要素にボーダーを生成する)
    const scrollbarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.borderRight = fixed
      ? `${scrollbarWidth}px solid transparent`
      : "";
    if (this.header) {
      this.header.style.borderRight = fixed
        ? `${scrollbarWidth}px solid transparent`
        : "";
    }

    // 2.スクロール位置を保存する
    const scrollY = fixed
      ? scrollingElement().scrollTop
      : parseInt(scrollingElement().style.top || "0");

    // 3.CSSで背面を固定する
    const styles = {
      height: "90vh",
      left: "0",
      overflow: "hidden",
      position: "fixed",
      top: `${scrollY * -1}px`,
      width: "100vw",
    };
    Object.keys(styles).forEach((key) => {
      if (fixed) {
        // OPEN時はCSSを設定する
        scrollingElement().style[key] = styles[key];
      } else {
        // CLOSE時はCSSを削除する
        scrollingElement().style[key] = "";
      }
    });

    // 4.スクロール位置を戻す
    if (!fixed) {
      // scroll-behaviorがsmoothになっているとページ内移動の際に
      // スクロールしてしまうためスクロールの直前に無効にする
      scrollingElement().style["scroll-behavior"] = "unset";
      window.scrollTo(0, scrollY * -1);
      scrollingElement().style["scroll-behavior"] = "";
    }
  }
}
