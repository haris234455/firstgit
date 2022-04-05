import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'

Vue.component('plp-parts-header', {
  computed: {
    ...mapState({
      collection: state => state.collection,
      products: state => state.products
    }),
    ...mapGetters([
      'title',
      'products'
    ])
  }
})
