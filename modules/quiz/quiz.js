import Vue from 'vue'
import qs from 'query-string'
import { handleize } from 'lib/util'
import nano from 'nanoajax'
import Cookies from 'js-cookie'
import state from 'lib/appState'
import eventBus from 'lib/eventBus'

import 'modules/quiz-question/quiz-question.vue'
import 'modules/tile-card/tile-card.vue'

const obj = {
  data () {
    const parsed = qs.parse(document.location.search)
    return {
      state: state,
      questions: [],
      currentQuestion: 0,
      progressIndex: 0,
      answers: parsed,
      tags: [],
      results: false,
      resultText: false,
      noResultText: false,
      quizWindow: false,
      newsletterUrl: ''
    }
  },
  created () {
    this.questions = quizData.questions
    this.state.quiz = 'questions'
    this.resultText = quizData.resultText
    this.noResultText = quizData.noResultText
    this.newsletterUrl = mailchimpUrl

    eventBus.$on('retakeQuiz', this.retakeQuiz)
  },
  mounted () {
    if (Object.keys(this.answers).length > 0) {
      this.skipToResults()
    }

    this.quizWindow = document.getElementById('quizApp')
  },
  computed: {
    questionsState () {
      return this.state.quiz === 'questions'
    },
    loadingState () {
      return this.state.quiz === 'loading'
    },
    resultsState () {
      return this.state.quiz === 'results'
    },
    tagsParameter () {
      return this.flattenTags().join('+')
    },
    searchUrl () {
      const baseUrl = '/blogs/recipes/tagged/'
      const viewParameter = '?view=quiz-results-endpoint-template'

      return baseUrl + this.tagsParameter + viewParameter
    },
    updatedResultText () {
      const name = this.answers['name_email'].split(':').shift()
      return ~this.resultText.indexOf('[name]') ? this.resultText.replace('[name]', name) : this.resultText
    },
    answersJoinedValues () {
      let keys = Object.keys(this.answers)
      let object = JSON.parse(JSON.stringify(this.answers))

      for (const key of keys) {
        if (Array.isArray(this.answers[key])) {
          object[key] = this.answers[key].join(', ')
        }
      }

      return object
    },
    answersStringified () {
      return JSON.stringify(this.answers)
    },
    answersJoinedValuesStringified () {
      return JSON.stringify(this.answersJoinedValues)
    },
    query () {
      let answers = JSON.parse(this.answersStringified)
      delete answers.email
      return qs.stringify(answers)
    }
  },
  methods: {
    skipToQuestion (e) {
      if (parseInt(e.target.dataset.questionIndex) <= this.progressIndex) {
        this.currentQuestion = parseInt(e.target.dataset.questionIndex)
      }
    },
    handleAnswer (e) {
      this.answers[e.questionKey] = e.answer
      this.updateTags()

      if ((this.currentQuestion + 1) === this.questions.length) {
        this.state.quiz = 'loading'
        this.updateURL()
        this.handleResults(3000)
      } else {
        this.currentQuestion++

        this.progressIndex = this.currentQuestion > this.progressIndex ? this.currentQuestion : this.progressIndex
      }

      this.quizWindow.scrollTop = 0
    },
    updateTags () {
      this.tags = Object.keys(this.answers)
        .filter(key => key !== 'name' && key !== 'email' && key !== 'name_email')
        .map(key => {
          const values = Array.isArray(this.answers[key]) ? this.answers[key] : this.answers[key].split('/')
          if (key === 'skin-type') {
            values.push('All')
          }

          return values.map(value => {
            return `${key}-${handleize(value)}`
          })
        })
    },
    handleResults (delay) {
      this.saveResults()

      nano.ajax({url: this.searchUrl}, (code, response) => {
        try {
          this.results = JSON.parse(response).articles
        } catch (error) {
          // Invalid response means no search results
          this.results = false
        }
      })

      setTimeout((delay) => {
        this.state.quiz = 'results'
      }, delay)
    },
    saveResults () {
      Cookies.set('quiz_answers', this.answersJoinedValuesStringified)
    },
    skipToResults () {
      this.updateTags()
      this.state.quiz = 'loading'
      this.handleResults(1000)
    },
    updateURL () {
      let url = `${window.location}?${this.query}`
      window.history.pushState('', '', url)
    },
    retakeQuiz () {
      let url = window.location.href.split('?')[0]
      window.history.pushState('', '', url)

      let keys = Object.keys(this.answers)
      for (let key of keys) {
        if (key !== 'name' && key !== 'name_email') {
          this.answers[key] = ''
        }
      }

      this.tags = []
      this.query = false

      this.currentQuestion = 1

      this.state.quiz = 'questions'
    },
    flattenTags () {
      return this.tags.reduce((list, tags) => {
        return list.concat(tags)
      }, [])
    }
  },
  delimiters: ['${', '}']
}

export default {
  init (el) {
    this.instance = new Vue({
      el,
      ...obj
    })
  },
  destroy () {
    this.instance.$destroy()
  }
}
