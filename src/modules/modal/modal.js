import 'browsernizr'
import {
  toggle
} from 'desandro-classie'
import DialogFx from 'dialog-fx'

export default {
  init (el) {
    var $body = $(el).parents('body')
    var dialogId = $(el).attr('data-dialog')
    var $dialog = document.getElementById(dialogId)
    var $modal = new DialogFx($dialog)

    /**
     * Toggle modal when clicking on trigger element.
     */
    $(el).on('click', function () {
      $modal.toggle()
      history.pushState(null, null, '#' + dialogId)
    })

    if (window.location.href.indexOf('#' + dialogId) > -1) {
      $modal.toggle()
    }
  },
  destroy () {}
}
