import Flickity from 'flickity'
import select from 'select-dom'
import on from 'dom-event'
import { arrowShape } from 'lib/util'

const ITEMS_TABLET = 3

export default el => {
  const carousel = select('.js-slider', el)

  if (carousel) {
    const slideNumbers = carousel.childElementCount
    const args = {
      arrowShape: arrowShape,
      groupCells: true,
      selectedAttraction: 0.0125,
      friction: 0.28
    }

    let flickity = null

    const initializeCarousel = () => {
      if (window.matchMedia('(min-width: 600px)').matches) {
        if (slideNumbers <= ITEMS_TABLET) {
          if (flickity) {
            flickity.destroy()
          }
          return flickity
        }
      } else if (slideNumbers <= 1) {
        if (flickity) {
          flickity.destroy()
        }
        return flickity
      }

      flickity = new Flickity(carousel, args)
    }

    on(window, 'change', initializeCarousel)
    on(window, 'resize', initializeCarousel)
    on(window, 'load', initializeCarousel)
  }
}
