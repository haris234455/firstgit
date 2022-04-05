/* OLD - Only for the Holidays need to be refactored to use the common layzr module */
import Blazy from 'blazy'

export default {
  init (el) {
    var lazy = new Blazy({
      container: '.main',
      loadInvisible: true,
      selector: '.js-lazy',
      successClass: 'is-loaded'
    })

    var force = document.querySelectorAll('.js-lazy-force') || false
    if (force) lazy.load(force)
  },
  destroy () {}
}
