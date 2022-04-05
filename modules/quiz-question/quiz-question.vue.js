import Vue from 'vue'
import qs from 'query-string'
import { handleize, style, unstyle } from 'lib/util'
import nano from 'nanoajax'
import jsonp from 'jsonp'
import state from 'lib/appState'

import 'modules/checkbox/checkbox.vue'
import 'modules/text-input/text-input.vue'

Vue.component('quiz-question', {
  props: [
    'name',
    'question',
    'savedAnswer',
    'buttonText',
    'newsletterUrl'
  ],
  data () {
    return {
      answer: this.savedAnswer || [],
      fieldValues: this.createFieldValuesObject(),
      ready: false,
      optionsLength: 1,
      newsletterChecked: false,
      state: state
    }
  },
  computed: {
    blank () {
      return this.answer.length === 0
    },
    answerString () {
      if (typeof this.answer === 'object') {
        return this.answer.join(',')
      } else {
        return this.answer
      }
    },
    updatedQuestion () {
      const name = this.name
        ? this.name.split(':').shift()
        : null

      return name
        ? this.question.text.replace('[name]', name)
        : this.question.text
    },
    hasEmptyFields () {
      return Object.keys(this.fieldValues).find(key => {
        return this.fieldValues[key] === ''
      })
    }
  },
  mounted () {
    this.ready = true
    if (this.question.options) {
      this.optionsLength = this.question.options.length
    }
  },
  methods: {
    submitAnswer () {
      if (this.question.key === 'name_email') {
        this.mailchimpSubmitHandler({
          'EMAIL': this.fieldValues['email']
        })

        return
      }

      this.emmitAnswer()
    },
    emmitAnswer () {
      this.$emit('answer', {
        questionKey: this.question.key,
        answer: (
          this.question.key !== 'email'
            ? this.answer
            : this.newsletterChecked
              ? this.answer
              : null
        )
      })
    },
    mailchimpSubmitHandler (params) {
      const query = Object.keys(params).map(key => {
        const value = encodeURIComponent(params[key])
        return `${key}=${value}`
      }).join('&')

      jsonp(`${this.newsletterUrl}&${query}`, {
        param: 'c'
      }, this.mailchimpResponseHandler)
    },
    mailchimpResponseHandler (error, data) {
      const message = data.msg

      if (error) {
        this.state.quizError = this.createErrorMessage('submission')
        return
      }

      if (data.result === 'error' && message.indexOf('already subscribed') === -1) {
        this.state.quizError = this.createErrorMessage(message)
        return
      }

      this.state.quizError = false

      this.emmitAnswer()
    },
    createErrorMessage (message) {
      if (~message.indexOf('submission')) {
        return quizStrings.submissionError
      }

      if (~message.indexOf('address is invalid')) {
        return quizStrings.invalidEmail
      }
    },
    staggeredFadeBeforeEnter (el) {
      el.style.opacity = 0
    },
    staggeredFadeEnter (el, done) {
      var delay = el.dataset.index * 100
      setTimeout(function () {
        el.style.opacity = 1

        done()
      }, delay)
    },
    toggleNewsletter (e) {
      this.newsletterChecked = e.value
    },
    createFieldValuesObject () {
      if (!this.question.fields) {
        return {}
      }

      return this.question.fields.reduce((accumulator, field) => ({
        ...accumulator,
        [field.key]: ''
      }), {})
    },
    handleFieldChange (event) {
      const key = event.name
      const value = event.value

      this.fieldValues[key] = value

      if (this.hasEmptyFields) {
        return
      }

      this.answer = this.serializeFields()
    },
    serializeFields () {
      return this.fieldValues['name'] + ':' + this.fieldValues['email']
    }
  },
  template: `
  <div class="quiz-question f fdc jcc" :class="{ hasTitle : question.title }">
    <div class="quiz-question__outer rel f fdc jcc">
      <div class="quiz-question__inner f fdc">
        <form class="quiz-question__form" @submit.prevent="submitAnswer">
          <transition
            name="fade"
            :css="false"
            @before-enter="staggeredFadeBeforeEnter"
            @enter="staggeredFadeEnter"
          >
            <h1 class="hurom-h2 quiz-question__text" :data-index="optionsLength" v-if="ready" v-html="updatedQuestion "></h1>
          </transition>

          <transition
            name="fade"
            v-if="question.type === 'input'"
            :css="false"
            @before-enter="staggeredFadeBeforeEnter"
            @enter="staggeredFadeEnter"
          >
            <text-input
              :id="question.key"
              class="text-input"
              :type="question.key === 'email' ? 'email' : 'text'"
              :placeholder="question.placeholder"
              data-index="1"
              v-show="ready"
              v-model="answer">
            </text-input>
          </transition>

          <div
            class="quiz-question__newletter f aic jcc"
            v-if="question.key === 'email'"
          >
            <checkbox
              name="newsletter"
              @change="toggleNewsletter"
              v-show="ready"
            ></checkbox>
            <span>Sign me up for the newsletter</span>
          </div>

          <transition
            name="fade"
            v-if="question.type === 'multiple-select'"
            :css="false"
            @before-enter="staggeredFadeBeforeEnter"
            @enter="staggeredFadeEnter"
          >
            <div
              class="quiz-question__options f fw jcc"
              v-show="ready"
              :data-index="optionsLength + 1"
            >
              <label v-for="(option, index) in question.options" class="quiz-question__option rel f jcc aic" :for="option.title" :key="option.title">
                <img :src="option.image_url" class="quiz-question__option__image" :alt="option.title">
                <input type="checkbox" :id="option.title" class="quiz-question__option__checkbox abs fit" :value="option.value" v-model="answer">
                <span class="quiz-question__option__text abs fit-l fit-r fit-b px1">{{ option.title }}</span>
              </label>
            </div>
          </transition>

          <transition
            name="fade"
            v-if="question.type === 'single-select'"
            :css="false"
            @before-enter="staggeredFadeBeforeEnter"
            @enter="staggeredFadeEnter"
          >
            <div
              class="quiz-question__options f fw jcc"
              v-show="ready"
              :data-index="optionsLength + 1"
            >
              <label v-for="(option, index) in question.options" class="quiz-question__option rel f jcc aic" :for="option.title" :key="option.title">
                <img :src="option.image_url" class="quiz-question__option__image" :alt="option.title">
                <input type="radio" :id="option.title" class="quiz-question__option__radio abs fit" name="currentQuestion" :value="option.value" v-model="answer">
                <span class="quiz-question__option__text abs fit-l fit-r fit-b px1">{{ option.title }}</span>
              </label>
            </div>
          </transition>

          <transition-group
            class="quiz-question__fields"
            name="fade"
            tag="div"
            v-if="question.type == 'multiple-input'"
            :css="false"
            @before-enter="staggeredFadeBeforeEnter"
            @enter="staggeredFadeEnter"
          >
            <text-input
              v-for="(field, index) in question.fields"
              :key="field.key"
              :id="field.key"
              class="text-input"
              :type="field.type"
              :placeholder="field.placeholder"
              :name="field.key"
              :data-index="index + 1"
              v-show="ready"
              v-bind:value="fieldValues[field.key]"
              @change="handleFieldChange">
            </text-input>
          </transition-group>

          <transition
            name="fade"
          >
            <p v-if="state.quizError" class="p" v-text="state.quizError"></p>
          </transition>

          <transition
            name="fade"
            :css="false"
            @before-enter="staggeredFadeBeforeEnter"
            @enter="staggeredFadeEnter"
          >
            <div class="quiz-question__submit-wrapper" :data-index="optionsLength + 2" v-if="ready">
              <button type="submit" class="quiz-question__submit btn button--solid-inv" :disabled="blank">{{ buttonText }}</button>
            </div>
          </transition>
        </form>

        <transition
          name="fade"
          :css="false"
          @before-enter="staggeredFadeBeforeEnter"
          @enter="staggeredFadeEnter"
        >
          <div class="quiz-question__tip outer"  :data-index="optionsLength + 3" v-if="question.tip && ready">
            {{ question.tip }}
          </div>
        </transition>
      </div>
    </div>
  </div>
  `
})
