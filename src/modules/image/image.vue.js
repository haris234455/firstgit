import Vue from 'vue'
import {supportsObjectFit} from 'lib/util'

Vue.component('vue-image', {
  props: {
    src: String,
    alt: String,
    css: String,
    size: Number,
    loader: {
      type: Boolean,
      default: false
    },
    spinner: {
      type: Boolean,
      default: true
    },
    spinnerSize: {
      type: String,
      default: 'lg'
    },
    scale: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {
      mainImageSrc: '',
      secondaryImgSrc: '',
      objectFit: supportsObjectFit(),
      states: {
        isLoaded: false
      }
    }
  },
  computed: {
    imgClasses () {
      return this.states.isLoaded ? 'is-loaded' : ''
    },
    parts () {
      const arr = this.src.split(new RegExp(`.(jpg|jpeg|png|gif)`))

      return {
        originalPath: arr[0],
        filePath: arr[0].replace(new RegExp(`_[0-9]*x`), ''),
        ext: arr[1],
        query: arr[2]
      }
    },
    blurSrc () {
      return this.getSizeSrc(50)
    },
    blurSrcStyle () {
      return `url(${this.blurSrc})`
    },
    sizeSrc () {
      return this.size ? this.getSizeSrc(this.size) : this.src
    },
    spinnerActive () {
      return !this.states.isLoaded
    },
    spinnerClass () {
      return `spinner spinner--abs z1 spinner--${this.spinnerSize}`
    }
  },
  mounted () {
    if (this.loader) {
      this.loadImage(this.blurSrc)
    }
  },
  methods: {
    onLoaded () {
      this.states.isLoaded = true
      const { image } = this.$refs
      const { scale } = this

      if (!image) {
        return
      }

      image.setAttribute('width', image.width * scale)
      image.setAttribute('height', image.height * scale)
    },
    getSizeSrc (size) {
      const { filePath, ext, query } = this.parts
      return `${filePath}_${size}x.${ext + query}`
    },
    loadImage (src, onLoad = () => {}) {
      const img = new Image()

      img.onload = onLoad
      img.src = src
    }
  },
  template: `
    <div class="img" :class="[css, imgClasses]">
      <transition name="fade">
        <img v-if="objectFit" ref="image" class="img__el" :src="sizeSrc" :alt="alt" :key="src" @load="onLoaded" />
        <div v-else class="img__el--shim" :style="{ backgroundImage: 'url(' + sizeSrc + ')' }" :key="src"></div>
      </transition>

      <i v-if="loader && objectFit" class="img__loader" :style="{ backgroundImage: blurSrcStyle }"></i>
      <i v-if="spinner && objectFit" :class="[spinnerClass, { 'is-active' : spinnerActive }]"></i>
    </div>
  `
})
