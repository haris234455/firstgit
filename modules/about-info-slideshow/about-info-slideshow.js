import slick from 'slick-carousel'
import select from 'select-dom'

const options = {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  fade: true,
  speed: 800
}

export default {
  init (el) {
    let $carousel = $(select('.js-carousel', el))
    $carousel.slick(options)
  },
  destroy () {}
}
