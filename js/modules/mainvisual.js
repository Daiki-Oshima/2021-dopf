var Obj = {
  loop: false,
  minDisplayTime: 2000,// アニメーションの間隔時間
  initialDelay: 250, // アニメーション開始までの遅延時間
  autoStart: true,
  in: {
    effect: 'fadeInUp',//animate.css の中にある採用したい動きのクラス名
    delayScale: 1,// 遅延時間の指数
    delay: 75,// 文字ごとの遅延時間
    sync: false,// アニメーションをすべての文字に同時適用するかどうか
    shuffle: true,// 文字表示がランダムな順に表示されるかどうか
  },
  out: {// 終了時のアニメーション設定をしたい場合はここに追記
  }
}
var element
//初期設定
function RandomInit() {
  element = $(".randomAnime");
  $(element[0]).textillate(Obj);
}

function RandomAnimeControl() {
  var elemPos = $(element[1]).offset().top - 50;
  var scroll = $(window).scrollTop();
  var windowHeight = $(window).height();

  if (scroll >= elemPos - windowHeight) {
    $(element[1]).textillate(Obj);
  }
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  RandomAnimeControl();/*アニメーション用の関数を呼ぶ*/
});//ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  RandomInit(); /*初期設定を読み込み*/
  RandomAnimeControl();/*アニメーション用の関数を呼ぶ*/
});//ここまで画面が読み込まれたらすぐに動かしたい場合の記述



$('.randomAnime').on('animationend', function () {
  //CSSアニメーションが終わった後に動かしたいソースコードを記述する
    setTimeout(function () {
      $(".fadeUp").animate({
        opacity: "1.0"
      }, 1500);
    }, 750);
});
