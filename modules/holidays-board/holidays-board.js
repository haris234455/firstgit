export default {
  init (el) {
    window.addEventListener('load', function () {
      var scrollH = function (e) {
        var cntWd = $('.hol-landing').innerWidth()
        var tb = $('.hol-landing__holder')
        var sldWd = tb.outerWidth()

        if (window.innerWidth < 1440 && window.innerWidth > 800) {
          tb.css({ left: ((cntWd - sldWd) * ((e.pageX / cntWd).toFixed(4))).toFixed(1) + 'px' })
        } else {
          tb.css({ left: ((cntWd - sldWd) * ((e.pageX / cntWd).toFixed(3))).toFixed(1) + 'px' })
        }
      }

      $('.hol-landing').mousemove(scrollH)

      $(window).resize(function () {
        $('.hol-landing__holder').removeAttr('style')
        $('.hol-landing').off('mousemove', scrollH)
        $('.hol-landing').mousemove(scrollH)
      })
    }, false)
  },
  destroy () {}
}
