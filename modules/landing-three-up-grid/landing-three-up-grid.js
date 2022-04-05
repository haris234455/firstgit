export default {
  init (el) {
    var $btnLoad = $(el).find('.three-up-grid__button')
    var itemLength = $(el).find('.three-up-grid__item').length

    $btnLoad.on('click', function (e) {
      var pageNew = parseInt($(el).attr('data-count')) + 1
      $(el).attr('data-count', pageNew)
      for (var i = (9 * pageNew + 1); i < (9 * (pageNew + 1) + 1); i++) {
        $(el).find('.three-up-grid__item:nth-child(' + i + ')').addClass('js-load-active')
      }
      if (itemLength <= 9 * (pageNew + 1)) {
        $btnLoad.hide()
      }
    })
  },
  destroy () {}
}
