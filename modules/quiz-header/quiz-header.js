import Vue from 'vue'
import state from 'lib/appState'
import eventBus from 'lib/eventBus'

export default el => new Vue({
  el,
  data () {
    return {
      state
    }
  },
  computed: {
    resultsState () {
      return this.state.quiz === 'results'
    }
  },
  methods: {
    retakeQuiz () {
      eventBus.$emit('retakeQuiz')
    }
  }
})
