import Vue from 'vue'
import store from './@store'
import { mapState, mapGetters } from 'vuex'
import select from 'select-dom'

export default el => new Vue({
  el: el,
  delimiters: ['${', '}'],
  store,
  computed: {
    ...mapState({
      modelHandle: state => state.modelHandle,
      productModels: state => state.productModels
    }),
    ...mapGetters([
      'collectionProducts',
      'collectionId',
      'products'
    ])
  },
  mounted () {
    this.$store.dispatch('fetchProductModels', this.$el.dataset.productModels)

    let handleProduct = window.location.href.split('juicer_')[1]
    if (handleProduct) {
      this.$store.commit('SET_MODEL_HANDLE', handleProduct)

      const query = `product_type:Part AND tag:juicer_${handleProduct}`
      this.$store.dispatch('fetchProducts', query)
    }
  },
  methods: {
    anchorTopMain () {
      const headerEl = select('.js-header')
      const promoEl = select('.js-promo')
      const headerHeight = (headerEl && promoEl) ? headerEl.clientHeight + promoEl.clientHeight : 0

      $('html, body, .main-content').animate({
        scrollTop: this.$el.offsetTop - headerHeight
      }, 500)
    },
    handleCollectionClick (handle, event) {
      event.preventDefault()

      this.$store.dispatch('fetchCollectionByHandle', handle)
      this.anchorTopMain()
    },
    handleProductClick (handle, title, event) {
      event.preventDefault()

      this.$store.commit('SET_PRODUCT_TITLE', title)
      this.$store.commit('SET_MODEL_HANDLE', handle)

      const query = `product_type:Part AND tag:juicer_${handle}`

      this.$store.dispatch('fetchProducts', query)
      this.anchorTopMain()
    },
    handleDropdownChange (event) {
      const { target: { selectedIndex, value, options } } = event

      this.$store.commit('SET_PRODUCT_TITLE', options[selectedIndex].text)
      this.$store.commit('SET_MODEL_HANDLE', value)

      const query = `product_type:Part AND tag:juicer_${value}`

      this.$store.dispatch('fetchProducts', query)
    },
    handleBackLinkClick () {
      this.anchorTopMain()

      if (this.products.length) {
        this.$store.commit('SET_PRODUCTS', {})
      } else {
        this.$store.commit('SET_COLLECTION', {})
      }

      this.$store.commit('SET_PRODUCT_TITLE', '')
      this.$store.commit('SET_MODEL_HANDLE', '')
    },
    generateKey (prefix) {
      if (!this.collectionId) {
        return
      }

      if (this.products.length) {
        return prefix + '-' + this.collectionId + '-' + this.products.length
      }

      return prefix + '-' + this.collectionId
    }
  }
})
