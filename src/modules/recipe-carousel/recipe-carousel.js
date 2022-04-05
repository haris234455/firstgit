import slick from 'slick-carousel'
import select from 'select-dom'
import on from 'dom-event'
import {
  set,
  unset,
  has,
  getIndex,
  isOver
} from 'lib/util'

const breakpoint = 660
const options = {
  arrows: true,
  dots: true,
  fade: true,
  speed: 800,
  slide: '.js-slide'
}

/*
 * Set Active State to Selected Navigation Link.
 */
const clickAccordion = (e, $carousel) => {
  let target = e.currentTarget.parentNode
  let $current = $(select('.is-active', $carousel[0]))

  if (!has(target, 'is-active')) set(target, 'is-active')
  if ($current.length > 0) unset($current[0], 'is-active')
}

/*
 * Set Active State to Selected Navigation Link.
 * Move to Selected Slide.
 */
const clickCarousel = (e, nav, $carousel) => {
  let target = e.currentTarget
  let current = select('.is-active', nav) || false
  let index = getIndex(target)

  if (current) unset(current, 'is-active')
  set(target, 'is-active')

  $carousel.slick('slickGoTo', index)
}

/*
 * Initialize Carousel/Accordion.
 */
const initSlideshow = (el) => {
  let nav = select('.js-nav', el)
  let navLinks = select.all('li', nav)
  let tabs = select.all('.js-tab', el)
  let $carousel = $(select('.js-carousel', el))

  if (isOver(breakpoint)) {
    unset($carousel[0], 'is-accordion')
    set($carousel[0], 'is-carousel')

    /*
     * Remove Click Handle on Accordion Navigation.
     */
    for (let tab of tabs) {
      let clone = tab.cloneNode(true)
      tab.parentNode.replaceChild(clone, tab)
    }

    /*
     * If Carousel hasn't been initialized.
     */
    if (!has($carousel[0], 'slick-slider')) {
      let current = select('.is-active', $carousel[0]) || false

      if (current) unset(current, 'is-active')

      $carousel
        .slick(options)
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          let current = select('.is-active', nav)
          let target = nav.children[nextSlide]

          unset(current, 'is-active')
          set(target, 'is-active')
        })

      for (let link of navLinks) {
        on(link, 'click', (e) => {
          clickCarousel(e, nav, $carousel)
        })
      }
    }
  } else {
    /*
     * Set Carousel to Accordion State.
     */
    unset($carousel[0], 'is-carousel')
    set($carousel[0], 'is-accordion')

    /*
     * Add Click Handle on Tabs Links.
     */
    for (let tab of tabs) {
      on(tab, 'click', (e) => {
        clickAccordion(e, $carousel)
      })
    }

    /*
     * If Carousel has been initialized, destroy it.
     */
    if (has($carousel[0], 'slick-slider')) {
      $carousel.slick('unslick')

      for (let link of navLinks) {
        let clone = link.cloneNode(true)
        link.parentNode.replaceChild(clone, link)
      }
    }
  }
}

export default {
  init (el) {
    initSlideshow(el)

    on(window, 'resize', () => {
      initSlideshow(el)
    })
  },
  destroy () {}
}
