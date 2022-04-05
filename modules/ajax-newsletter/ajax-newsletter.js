export default {
  init (el) {
    var newsletter = el
    var form = newsletter.querySelector('.js-form')
    var method = form.getAttribute('method')
    var action = form.getAttribute('action')
    var title = newsletter.querySelector('.js-title')
    var error = newsletter.querySelector('.js-error')
    var success = newsletter.querySelector('.js-success')

    var gaCategory = form.getAttribute('data-ga-category') || false
    var gaLabel = form.getAttribute('data-ga-label') || false
    var fbEvent = form.getAttribute('data-fb-event') || false

    /**
     * Handle Mailchimp newsletter.
     */
    form.addEventListener('submit', function (e) {
      e.preventDefault()

      $.ajax({
        type: method,
        url: action,
        data: $(form).serialize(),
        cache: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        error: function (err) {
          console.log('Can\'t connect to Mail server')
          console.log(err)
        },
        success: function (data) {
          if (data.result !== 'success') {
            error.classList.remove('hidden')
          } else {
            title.innerHTML = 'Thank you!'
            form.style.display = 'none'
            success.innerHTML = 'Please confirm by clicking the link in the email we just sent you.'
            if (gaCategory && gaLabel && fbEvent) {
              ga('send', 'event', gaCategory, 'Success', gaLabel)
              fbq('track', fbEvent)
            }
          }
        }
      })
    })
  },
  destroy () {}
}
