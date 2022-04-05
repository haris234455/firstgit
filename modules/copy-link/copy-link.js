import Clipboard from 'clipboard'

export default {
  init (el) {
    var copyMessage = $(el).parent().find('.js-copy')
    var clipboard = new Clipboard(el)

    /**
     * Copy to clipboard a link url.
     */
    clipboard.on('success', function (e) {
      copyMessage.fadeIn()

      setTimeout(function () {
        copyMessage.fadeOut()
      }, 2000)
    })
  },
  destroy () {}
}
