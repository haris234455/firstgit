import Vue from 'vue'
import { decode } from 'lib/util'

import 'modules/image/image.vue.js'

Vue.component('tile-card', {
  props: ['article', 'decode'],
  /**
   * Data can come via a JSON string that needs to be
   * decoded, or via an javascript object, passed by a
   * parent component.
   *
   */
  data () {
    if (!!this.decode && this.article) {
      return JSON.parse(decode(this.article))
    }

    return this.article
  },
  computed: {
    imageSrc () {
      return this.image
    },
    link () {
      return this.url
    }
  }
})
