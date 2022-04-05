const smoothScrollling = (endpoint) => {
  $('html, body, .main-content').animate({
    scrollTop: endpoint.offset().top
  }, 500)
}

export default {
  init (el) {
    var scrollButtons = document.querySelectorAll('[data-scroll]')

    scrollButtons.forEach(function (toggle) {
      toggle.addEventListener('click', function (e) {
        e.preventDefault()
        var $endpoint = $($(this).data('scroll'))
        smoothScrollling($endpoint)
      }, false)
    })

    $(document).on('click', '#fb-hero-field-submit', function () {
      $('.landing-subscribe__text').hide()
    })
  },
  destroy () {}
}
