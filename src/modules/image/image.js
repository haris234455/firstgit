import on from 'dom-event'
import objectFitImages from 'object-fit-images'
import Layzr from 'layzr.js'
import {
  set
} from 'lib/util'
import select from 'select-dom'

const instance = Layzr({
  normal: 'data-normal',
  retina: 'data-retina',
  srcset: 'data-srcset',
  threshold: 0
})

instance
  .on('src:before', image => {
    const onLoad = function () {
      let container = image.parentNode || false
      let sources = select.all('source', container)

      if (sources.length) {
        sources.map(source => {
          if (source.hasAttribute('data-srcset')) {
            source.setAttribute('srcset', source.getAttribute('data-srcset'))
            source.removeAttribute('data-srcset')
          }
        })
      }

      if (container) {
        set(container, 'is-loaded')
      }
      objectFitImages()
    }

    /* For some reason, onLoad events are not firing on picture elements in Safari. */
    const fallbackEvent = setTimeout(onLoad, 500)

    image.onload = () => {
      onLoad()
      clearTimeout(fallbackEvent)
    }
  })

export default {
  init (el) {
    instance
      .update()
      .check()
      .handlers(true)
  },
  destroy () {}
}
