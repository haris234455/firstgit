export default {
  init (el) {
    $(el).on('click', function () {
      var header = $(el).parents('body').find('.header--fixed')
      var productNav = $(el).parents('body').find('.product-nav')
      var anchor = $($(this).attr('data-anchor'))
      var positionBase = (header.length) ? parseInt(anchor.offset().top) - parseInt(header.outerHeight(true)) : parseInt(anchor.offset().top)
      var position = (productNav.length) ? positionBase - parseInt(productNav.outerHeight(true)) : positionBase
      var speed = 1000

      /**
       * Rewrite url to include anchor link.
       */
      history.pushState(null, null, $(this).attr('data-anchor'))

      /**
       * Scroll to element (offset depends on header and/or product nav visibility).
       */
      $('html, body').stop(true, true).animate({
        scrollTop: position
      }, 1000)
    })
  },
  destroy () {}
}
