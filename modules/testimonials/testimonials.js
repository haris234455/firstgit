import Flickity from 'flickity'
import select from 'select-dom'
import { debounce, arrowShape } from 'lib/util'

export default el => {
  const carousel = select('.js-carousel', el)
  const milliseconds = 5000
  const delay = 150
  const resizeClass = 'flickity-resize'

  const flkty = new Flickity(carousel, {
    autoPlay: milliseconds,
    arrowShape: arrowShape,
    on: {
      ready () {
        carousel.classList.add(resizeClass)
      },
      resize: debounce(() => {
        carousel.classList.remove(resizeClass)
        flkty.resize()
        carousel.classList.remove(resizeClass)
      }, delay)
    }
  })
}
