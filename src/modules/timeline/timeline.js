export default {
  init (el) {
    var $content = $(el).find('.timeline__item')
    $(window).on('scroll', function () {
      $content.each(function () {
        if ($(this).offset().top <= $(window).scrollTop() + $(window).height() * 0.75) {
          $(this).addClass('timeline__item--visible')
        }
      })
    })
  },
  destroy () {}
}
