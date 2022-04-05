import select from 'select-dom'
import on from 'dom-event'
import {
  has,
  unset,
  set,
  write
} from 'lib/util'

export default {
  init (el) {
    const colors = select.all('.js-color', el)
    const elContainer = el.parentNode
    const link = select('.js-color-link', elContainer.parentNode)
    const image = select('.js-color-image', elContainer.parentNode)
    const price = select('.js-color-price', elContainer.parentNode)
    const initialSaleLabels = select('.js-sale-labels', elContainer.parentNode)

    /*
     * For each product color variant.
     */
    for (let color of colors) {
      let colorLink = color.getAttribute('data-link')
      let colorImage = color.getAttribute('data-image')
      let colorPrice = color.getAttribute('data-price')

      /*
       * Preload product variant images.
       */
      let img = new Image()
      img.src = colorImage

      on(color, 'click', (e) => {
        if (initialSaleLabels) {
          initialSaleLabels.style.display = 'none'
        }

        if (!has(color, 'is-disabled')) {
          /*
           * Set active color variant.
           */
          unset(select.all('.is-active', el), 'is-active')
          set(color, 'is-active')

          /*
           * Switch URL, image and price when clicking on an active color variant.
           */
          link.setAttribute('href', colorLink)
          image.setAttribute('src', colorImage)
          write(price, colorPrice)
        }
      })
    }
  },
  destroy () {}
}
