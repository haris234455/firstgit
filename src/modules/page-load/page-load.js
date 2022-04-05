import NProgress from 'nprogress'
import imagesLoaded from 'imagesloaded'
import 'jquery-visible'
import 'vendors/jquery-inview'

export default {
  init (el) {
    console.log('page-load')
    var $page = $(el).find('*[data-page-load]')
    var $views = $(el).find('*[data-view]')
    var step = 100 / $(el).find('img').length
    var ready = false
    var complete = function (element) {
      element.css('opacity', '1')
    }

    // Hide all data-view elements.
    $views.css({
      'visibility': 'hidden',
      'animation-name': 'none'
    })

    // For each data-view elements.
    $views.each(function () {
      var $this = $(this)
      var always = $this.attr('data-view-always')

      // If on load data-view elements are not in the viewport, remove their data-view-delay attribute.
      if (!$this.visible(true) && typeof always === typeof undefined) {
        $this.removeAttr('data-view-delay')
      }

      // If on load the first data-view element of the page is not in the viewport, remove its data-view-delay attribute.
      if (!$views.first().visible(true) && typeof always === typeof undefined) {
        $this.removeAttr('data-view-delay')
      }
    })

    // Start the load progress bar.
    NProgress.start()

    $(el).imagesLoaded()
      .progress(function (instance, image) {
        if (!ready) {
          // On each images loaded, increment the load progress bar.
          NProgress.inc(step / 100)
        }
      })
      .always(function (instance) {
        // End the load progress bar.
        NProgress.done(true)
        ready = true
        $('html').addClass('js-page-loaded')

        // Set the visibility of the page to 'visible'.
        complete($page)

        // On scroll, when a data-view element is in the viewport, animate it.
        $views.on('inview', function (event, isInView) {
          var $this = $(this)
          var animation = $this.attr('data-view')
          var tempDelay = $this.attr('data-view-delay')
          var tempInfinite = $this.attr('data-view-infinite')
          var tempDuration = $this.attr('data-view-duration')
          var delay = (typeof tempDelay !== typeof undefined && tempDelay !== '') ? tempDelay : '0s'
          var iteration = (typeof tempInfinite !== typeof undefined) ? 'infinite' : '1'
          var duration = (typeof tempDuration !== typeof undefined && tempDuration !== '') ? tempDuration : ''

          $this.addClass(animation)

          $this.css({
            'visibility': 'visible',
            'animation-name': animation,
            'animation-delay': delay,
            'animation-iteration-count': iteration,
            'animation-duration': duration
          })
        })
      })
    setTimeout(() => {
      $('<label class="sr-only" for="s4com-q">Enter a Question</label>').insertBefore('.autocomplete.aa-input')
    }, 500)
  },
  destroy () {}
}
