__webpack_public_path__ = BRRL_PATH(BRRL_PUBLIC_PATH, BRRL_PROXY) // eslint-disable-line camelcase

import app from 'lib/init'
import focusVisible from 'focus-visible'

import {
  unset,
  isTouch
} from 'lib/util'

document.addEventListener('DOMContentLoaded', () => {
  app.init()

  if (isTouch()) unset(document.getElementsByTagName('body')[0], 'no-touch')
})
