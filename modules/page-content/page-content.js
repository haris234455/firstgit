export default {
  init (el) {
    var allImg = $(el).find('img')
    var allLink = $(el).find('a')
    var post = 'page-content--post'
    var url = window.location.href

    // For each link found on the page.
    allLink.each(function () {
      var linkAttr = $(this).attr('href')
      var linkText = $(this).text()

      if (typeof linkAttr !== typeof undefined && linkAttr !== '') {
        // Handle Tracking events.
        if (linkAttr.indexOf('#') === -1) {
          if (linkAttr.indexOf('.pdf') >= 0) {
            // Add tracking to download links.
            $(this).attr('onClick', 'ga("send", "event", "File Downloads", "Download: ' + linkText + '", "Referrer: {{ page_title }}")')
          } else {
            // Add tracking to outbound links.
            $(this).attr('onClick', 'ga("send", "event", "Outbound Links", "Click: ' + linkAttr + '", "Referrer: {{ page_title }}")')
          }
        }
        // Handle anchor scrolling animation.
        if (linkAttr.indexOf('#') !== -1) {
          linkAttr = linkAttr.replace('#', '')

          $(this).on('click', function (e) {
            e.preventDefault()

            var header = $(el).parents('body').find('.header--fixed')
            var promoBanner = $(el).parents('body').find('.promo-banner')
            var anchor = $('[name="' + linkAttr + '"]')
            var position = (header.length) ? parseInt(anchor.offset().top) - parseInt(header.outerHeight(true)) : parseInt(anchor.offset().top)
            var speed = 1000

            position = (promoBanner.hasClass('promo-banner--open')) ? position - parseInt(promoBanner.outerHeight(true)) : position

            // Scroll to element (offset depends on header and/or product nav visibility).
            $('html, body').stop(true, true).animate({
              scrollTop: position
            }, speed)
          })
        }
      }
    })

    if (url.indexOf('#') >= 0) {
      var header = $(el).parents('body').find('.header--fixed')
      var promoBanner = $(el).parents('body').find('.promo-banner')
      var anchor = $('[name="' + url.substr(url.indexOf('#') + 1) + '"]')
      var position = (header.length) ? parseInt(anchor.offset().top) - parseInt(header.outerHeight(true)) : parseInt(anchor.offset().top)
      var speed = 1000

      position = (promoBanner.hasClass('promo-banner--open')) ? position - parseInt(promoBanner.outerHeight(true)) : position

      // Scroll to element (offset depends on header and/or product nav visibility).
      $('html, body').stop(true, true).animate({
        scrollTop: position
      }, speed)
    }
  },
  destroy () {}
}
