const initCountryDropdown = (dropdown, dropdownItem) => {
  // Reset dropdown max-height
  dropdown.css('max-height', '200px')
  // Set dropdown height to height of first item plus borders
  let dropdownItemHeight = dropdownItem.outerHeight() + 4
  dropdown.css('max-height', dropdownItemHeight + 'px')

  // First item toggles country dropdown
  dropdownItem.on('click', function (e) {
    e.preventDefault()
    if (dropdown.height() > dropdownItemHeight) {
      dropdown.css('max-height', dropdownItemHeight + 'px')
    } else {
      dropdown.css('max-height', '200px')
    }
  })
}

export default {
  init (el) {
    var form = $(el).find('#mc-embedded-subscribe-form')
    var content = $(el).find('.footer-newsletter')
    var input = form.find('.footer-newsletter__field')
    var errorMsg = form.find('.error')
    var successTitle = 'Thanks for subscribing!'
    var successMsg = 'Please confirm by clicking the link in the email we just sent you.'
    var dropdown = $(el).find('[data-dropdown]')
    var dropdownItem = dropdown.find('.footer-country__item').first()

    /**
     * Ajax Mailchimp newsletter form submit.
     */
    form.on('submit', function (e) {
      e.preventDefault()

      $.ajax({
        type: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        cache: false,
        dataType: 'json',
        contentType: 'application/json charset=utf-8',
        error: function (err) {
          console.log('Can\'t connect to Mail server')
          console.log(err)
        },
        success: function (data) {
          if (data.result !== 'success') {
            if (data.msg.indexOf('already subscribed') >= 0) errorMsg.text('Email address is already subscribed.')
            input.addClass('field--error')
            errorMsg.removeClass('hidden')
          } else {
            content.html('<p class="footer-newsletter__head">' + successTitle + '</p><p class="footer-newsletter__msg">' + successMsg + '</p>')
            ga('send', 'event', 'Newsletter Signup', 'Success', 'Referrer: {{ page_title }} - Footer')
            fbq('track', 'NewsletterSignup')
          }
        }
      })
    })

    initCountryDropdown(dropdown, dropdownItem)
    $(window).resize(function () {
      initCountryDropdown(dropdown, dropdownItem)
    })
  },
  destroy () {}
}
