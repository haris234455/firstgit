export default {
  init (el) {
    var $btnclose = $(el).find('.landing-modal__close')

    $btnclose.on('click', function () {
      $(el).removeClass('js-modal-active')
      $('body').removeClass('js-modal-open')
    })

    $('.three-up-grid__link').on('click', function () {
      $(el).addClass('js-modal-active')
      $('body').addClass('js-modal-open')
    })
  },
  destroy () {}
}
