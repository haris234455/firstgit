import Cookies from 'js-cookie'

export default {
  init (el) {
    var $header = $(el).parents('body').find('.header')
    var $main = $(el).parents('body').find('.main')
    var $close = $(el).find('[data-promo-close]')
    var expireDate = parseInt('{{ settings.promo_banner_expireDate }}')
    var open = 'promo-banner--open'
    var fix = function () {
      if ($(el).hasClass('promo-banner--open')) {
        var promo = $(el).children().outerHeight(true)
        var headerTop = promo
        var mainPadding = $header.outerHeight(true) + headerTop

        $header.css('top', headerTop)

        if ($('body').hasClass('template-index')) {
          $main.css('padding-top', headerTop)
          return
        }

        $main.css('padding-top', mainPadding)
      }
    }

    $(window).load(function () {
      // If the cookie 'hide_hurom_promo' doesn't exist, open promo bar.
      if (Cookies.get('hide_hurom_promo') !== 1) {
        $(el).addClass('promo-banner--open')
      }
      fix()

      // Close promo bar and create cookie 'hide_hurom_promo'.
      $close.on('click', function () {
        var headerTopBase = parseInt($header.css('top')) - $(el).outerHeight(true)
        var mainPaddingBase = parseInt($header.outerHeight(true))

        Cookies.set('hide_hurom_promo', 1, { expires: expireDate })

        $(el).removeClass('promo-banner--open')
        $header.css('top', '')
        $main.css('padding-top', '')
      })

      $(window).resize(fix)
    })
  },
  destroy () {}
}
