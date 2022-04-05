import Vue from 'vue'
import { formatMoney } from '@shopify/theme-currency'
import { handleize, parseStorefrontId } from 'lib/util'
import cart from 'lib/cart'
import eventBus from 'lib/eventBus'
import { mapState } from 'vuex'

Vue.component('plp-parts-product-card', {
  filters: {
    currency (cents) {
      // eslint-disable-next-line no-template-curly-in-string
      return formatMoney(cents, '${{amount_no_decimals}}')
    }
  },
  props: [
    'featuredImageSrc',
    'title',
    'url',
    'handle',
    'variants',
    'options'
  ],
  data () {
    return {
      selectedVariant: {},
      isAddedToCart: false,
      soldOut: false,
      error: null
    }
  },
  computed: {
    ...mapState({
      modelHandle: state => state.modelHandle
    }),
    colorOption () {
      if (!this.options) {
        return
      }

      return this.options.find(this.isOptionColor)
    },
    selectedVariantColor () {
      if (!this.colorOption) {
        return
      }

      const variantColorOption = this.selectedVariantNode.selectedOptions.find(this.isOptionColor)

      return variantColorOption.value
    },
    selectedVariantNode () {
      if (!this.selectedVariant) {
        return
      }

      return this.selectedVariant.node
    },
    selectedVariantImageSrc () {
      if (!this.selectedVariantNode) {
        return
      }

      return this.selectedVariantNode.image.transformedSrc
    },
    selectedVariantId () {
      if (!this.selectedVariantNode) {
        return
      }

      return parseStorefrontId(this.selectedVariantNode.id)
    },
    selectedVariantUrl () {
      if (!this.selectedVariantNode) {
        return
      }

      if (this.modelHandle) {
        return `${this.url}?variant=${this.selectedVariantId}&model=juicer_${this.modelHandle}`
      }

      return `${this.url}?variant=${this.selectedVariantId}`
    },
    selectedVariantPrice () {
      if (!this.selectedVariantNode) {
        return
      }

      return this.selectedVariantNode.priceV2.amount * 100
    }
  },
  created () {
    if (this.variants) {
      this.selectedVariant = this.variants[0]
    }
  },
  mounted () {
    if (this.selectedVariantNode) {
      this.soldOut = !this.selectedVariantNode.availableForSale
    }
  },
  methods: {
    addToCart () {
      cart.add({
        id: this.selectedVariantId,
        quantity: 1
      }).then(data => {
        if (data.hasOwnProperty('error')) {
          this.error = data.error
          this.soldOut = true
          setTimeout(() => {
            this.error = null
          }, 2000)
        } else {
          this.isAddedToCart = true
          // revert to original text
          setTimeout(() => {
            this.isAddedToCart = false
          }, 2000)
          eventBus.$emit('add-to-cart')
        }
      }).catch(e => {
        console.log(e)
      })
    },
    colorSwatchImage (color) {
      const colorHandle = this.handleize(color)

      return `${window.SHOPIFY_FILES_CDN}swatch-${colorHandle}-pos.jpg`
    },
    changeVariant (color) {
      this.selectedVariant = this.variants.find(variant => (
        variant.node.selectedOptions.find(option => (
          option.value === color
        ))
      ))
      this.soldOut = !this.selectedVariant.node.availableForSale
    },
    isOptionColor (option) {
      const colorRegex = /color/i

      return option.name.match(colorRegex)
    },
    variantByColor (color) {
      return this.variants.find(variant => (
        variant.node.selectedOptions.find(option => (
          option.value === color
        ))
      ))
    },
    colorVariantUrl (color) {
      const variant = this.variantByColor(color)
      const variantId = parseStorefrontId(variant.node.id)

      return `${this.url}?variant=${variantId}`
    },
    handleize
  }
})
