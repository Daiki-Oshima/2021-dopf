/*
 * 初期化
 * -------------------------------------------------------------------
 */
window.addEventListener("DOMContentLoaded", function () {
  // 画像モーダルを初期化
  new ModalPhoto();
});
/*
* 画像モーダル
* -------------------------------------------------------------------
*/
class ModalPhoto {
  constructor(options) {

    // モーダル
    this.modal = document.getElementById("modal-photo");
    // モーダルの背景
    this.modalOverlay = document.getElementById("modal-photo-overlay");
    // モーダル用のリンク
    this.modalLink = document.getElementsByClassName("js-modal-photo");
    // モーダルの閉じるボタン
    this.modalClose = document.getElementById("modal-photo-close");
    // モーダルの前へボタン
    this.modalPrev = document.getElementById("modal-photo-prev");
    // モーダルの次へボタン
    this.modalNext = document.getElementById("modal-photo-next");
    // モーダル画像
    this.modalImage = document.getElementById("modal-photo-image");
    // モーダル開閉スピード
    this.toggleDuration = 500;

    // 選択中の画像
    this.current = null;
    // 画像リスト
    this.imageList = [];

    if (!this.modal) return;

    /*
    * モーダルの開閉スピードの設定
    */
    document.documentElement.style.setProperty(
      "--photo-modal-duration",
      `${this.toggleDuration}ms`
    );

    /*
     * イベントハンドラの設定
     */
    // モーダルを開く
    for (var i = 0; i < this.modalLink.length; i++) {
      this.modalLink[i].addEventListener("click", { object: this, element: this.modalLink[i], handleEvent: this.eventModalOpen });
    }
    // 前へを表示する
    this.modalPrev.addEventListener("click", { object: this, handleEvent: this.eventClickPrev });
    // 次へを表示する
    this.modalNext.addEventListener("click", { object: this, handleEvent: this.eventClickNext });
    // モーダルを閉じる
    this.modalClose.addEventListener("click", this.eventModalClose.bind(this), false);
    // 背景部分をクリック
    this.modalOverlay.addEventListener("click", this.eventModalClose.bind(this), false);
  }
  /**
   * モーダルを開く
   */
  eventModalOpen(e) {

    // モーダルの背景を固定する
    this.object.background(true);
    // モーダルを表示にする
    this.object.modal.style.display = "flex";
    // "data-open"属性を設定
    this.object.modal.setAttribute("data-open", true);

    this.object.showImage("current", this.element);
  }
  /**
   * 前へをクリック
   */
  eventClickPrev(e) {
    this.object.showImage("prev");
  }
  /**
   * 次へをクリック
   */
  eventClickNext(e) {
    this.object.showImage("next");
  }
  /**
   * モーダルを閉じる
   */
  eventModalClose() {
    // "data-open"属性を設定
    this.modal.setAttribute("data-open", false);
    // モーダルの背景の固定を解除する
    this.background(false);
    // モーダルを非表示にする
    setTimeout(() => {
      this.modal.style.display = "none";
    }, this.toggleDuration);
  }
  /**
   * 画像を表示する
   */
  showImage(action, select) {

    // 選択された要素を保存する
    if (action == "current" && select) {
      this.current = select;
    }
    // 要素リストを作成する
    const elementList = [].slice.call(this.modalLink);
    // 現在の位置を取得する
    const currentNo = elementList.indexOf(this.current);

    console.log("number=" + currentNo);
    console.log("length=" + elementList.length);

    let target = this.current;

    // 前の画像があるか判定する
    if (action == "prev") {
      if (elementList[currentNo - 1] !== undefined) {
        console.log("前の要素がある");
        target = elementList[currentNo - 1];
      } else {
        target = elementList[elementList.length - 1];
      }
      // 選択された要素を保存する
      if (target) this.current = target;
    }
    // 次の画像があるか判定する
    if (action == "next") {
      if (elementList[currentNo + 1] !== undefined) {
        console.log("次の要素がある");
        target = elementList[currentNo + 1];
      } else {
        target = elementList[0];
      }
      // 選択された要素を保存する
      if (target) this.current = target;
    }
    /*
     * 画像の表示を行う
     */
    const photo = target.dataset.photo;
    this.modalImage.setAttribute("src", photo);
  }
  /**
   * モーダルの背景を制御する
   * @param fixed (true:OPEN false:close)
   */
  background(fixed) {
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

    // 2.スクロール位置を保存する
    const scrollY = fixed
      ? scrollingElement().scrollTop
      : parseInt(scrollingElement().style.top || "0");

    // 3.CSSで背面を固定する
    const styles = {
      height: "100vh",
      left: "0",
      overflow: "hidden",
      position: "fixed",
      top: `${scrollY * -1}px`,
      width: "100vw"
    };
    Object.keys(styles).forEach((key) => {
      if (fixed) {
        // OPEN時はCSSを設定する
        scrollingElement().style[key] = styles[key]
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
