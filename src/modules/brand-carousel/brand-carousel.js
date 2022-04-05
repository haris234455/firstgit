import Flickity from 'flickity'
import { arrowShape } from 'lib/util'

export default el => {
  const flkty = new Flickity(el, {
    cellSelector: '.brand-carousel-card',
    groupCells: true,
    arrowShape: arrowShape
  })
}
