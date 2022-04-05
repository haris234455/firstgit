import slick from 'slick-carousel'
import {
  has
} from 'lib/util'

export default {
  init (el) {
    let $carousel = $(el)
    let isFourUp = has(el, '.js-carousel-4-up')
    let options = (isFourUp)
      ? {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        fade: false,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
          breakpoint: 900,
          settings: {
            fade: true,
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      }
      : {
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        fade: true,
        speed: 800
      }

    $carousel.slick(options)
  },
  destroy () {}
}
