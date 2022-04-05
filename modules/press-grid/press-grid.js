export default {
  init (el) {
    var pressItem = $(el).find('.press-item')
    var resize = function (el) {
      var height = 0

      el.each(function () {
        var container = $(this).find('.press-item__container')
        var item = 0

        container.children().each(function () {
          item = item + $(this).outerHeight(true)
        })

        item = item + parseInt(container.css('padding-top')) + parseInt(container.css('padding-bottom'))

        if (item > height) height = item
      })

      el.css('height', height)
    }

    resize(pressItem)

    $(window).on('resize', function () {
      resize(pressItem)
    })
  },
  destroy () {}
}
