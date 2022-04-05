import Flickity from 'flickity'
import select from 'select-dom'
import { arrowShape } from 'lib/util'

export default el => {
  const carousel = select('.product-four-up__items', el)

  const flkty = new Flickity(carousel, {
    arrowShape: arrowShape,
    groupCells: true,
    selectedAttraction: 0.0125,
    friction: 0.28
  })
}
