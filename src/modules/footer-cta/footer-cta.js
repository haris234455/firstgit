import Vue from 'vue'
import { getQueryVar } from 'lib/util'

export default el => new Vue({
  el: el,
  computed: {
    partsModel () {
      return getQueryVar('model') ? getQueryVar('model') : ''
    },

    partsLink () {
      return `/collections/parts/${this.partsModel}`
    }
  },
  mounted () {
    var main = $(el).parents('body').find('.main')
    var wrapper = $(el).parents('body').find('.wrapper')

    /**
     * Add to global layout style to support footer CTA.
     */
    main.addClass('main--with-footer-cta')
    wrapper.addClass('wrapper--with-footer-cta')
  }
})
