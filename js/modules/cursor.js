var follower = $(".follower"),
  cWidth = 8,
  fWidth = 10,
  delay = 10,
  mouseX = 0,
  mouseY = 0,
  posX = 0,
  posY = 0;

TweenMax.to({}, 0.001, {
  repeat: -1,
  onRepeat: function () {
    posX += (mouseX - posX) / delay;
    posY += (mouseY - posY) / delay;

    TweenMax.set(follower, {
      css: {
        left: posX - fWidth / 2,
        top: posY - fWidth / 2,
      },
    });
  },
});

$(document).on("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

$("a").on({
  mouseenter: function () {
    follower.addClass("is-active");
  },
  mouseleave: function () {
    follower.removeClass("is-active");
  },
});
