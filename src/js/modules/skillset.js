$(window).on("scroll", function () {
  $(".skillset__bar-animation").each(function () {
    var position = $(this).offset().top;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (scroll > position - windowHeight) {
      $(this).addClass("isActive");
    }
  });
});
