export default {
  init (el) {
    var $featuredImg = $(el).find('[data-href]')
    var redirect = $featuredImg.attr('data-href')

    if ($featuredImg.length) {
      /**
       * Clean data attribute which contains link url.
       */
      $featuredImg.removeAttr('data-href')

      /**
       * Redirect to collection page when clicking on collection featured image.
       */
      $featuredImg.on('click', function () {
        window.location.href = redirect
      })
    }
  },
  destroy () {}
}
