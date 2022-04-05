import nano from 'nanoajax'
import Cookies from 'js-cookie'

export default {
  init (el) {
    const cachedAnswers = Cookies.get('quiz_answers')
    if (!cachedAnswers) {
      return
    }

    const url = el.getAttribute('data-url')
    const customerId = el.getAttribute('data-customer')
    const parsed = JSON.parse(cachedAnswers)

    if (!url) {
      return
    }

    if (parsed.email) {
      nano.ajax({
        url: `${url}/profile/mailchimp`,
        method: 'POST',
        body: JSON.stringify({...parsed})
      }, (code, res) => {
        const {
          email,
          ...emailRemoved
        } = parsed

        Cookies.set('quiz_answers', JSON.stringify(emailRemoved))
      })
    }

    if (!customerId) {
      return
    }

    nano.ajax({
      url: `${url}/profile/tags`,
      method: 'POST',
      body: JSON.stringify({...parsed, id: customerId})
    }, (code, res) => {
      Cookies.remove('quiz_answers')
    })
  },
  destroy () {}
}
