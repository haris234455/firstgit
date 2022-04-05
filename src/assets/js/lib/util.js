export const isTouch = () => 'ontouchstart' in document.documentElement

export const isIE = () => navigator.userAgent.toLowerCase().indexOf('msie') > 0

export const isIE11 = () => !!window.MSInputMethodContext && !!document.documentMode

export const isFirefox = () => navigator.userAgent.toLowerCase().indexOf('firefox') > -1

export const isOver = (breakpoint) => window.innerWidth >= breakpoint

/**
 * Adds a class to a DOM Node.
 *
 * @param {*} item
 * @param {*} selector
 */
export const set = (item, selector) => {
  if (item instanceof Array) {
    for (let i of item) {
      i.classList.add(selector)
    }
  } else {
    item.classList.add(selector)
  }
}

/**
 * Removes a class from a DOM Node.
 *
 * @param {*} item
 * @param {*} selector
 */
export const unset = (item, selector) => {
  if (item instanceof Array) {
    for (let i of item) {
      i.classList.remove(selector)
    }
  } else {
    item.classList.remove(selector)
  }
}

/**
 * Checks to see whether a DOM Node
 * has a class.
 *
 * @param {*} item
 * @param {*} selector
 */
export const contains = (item, selector) => item.classList.contains(selector)

/**
 * Replace a class on a DOM Node
 *
 * @param {*} item
 * @param {*} a old class
 * @param {*} b new class
 */
export const replace = (item, a, b) => {
  item.classList.replace(a, b)
}

/**
 * Toggles a class of a DOM node
 *
 * @param {*} item
 * @param {*} selector
 */
export const toggle = (item, selector) => {
  if (item instanceof Array) {
    for (let i of item) {
      i.classList.toggle(selector)
    }
  } else {
    item.classList.toggle(selector)
  }
}

export const getHeight = el => `${el.offsetHeight}px`

export const getWidth = el => `${el.offsetWidth}px`

export const getRatio = el => el.offsetHeight / el.offsetWidth

export const handleize = str => str.toLowerCase().trim().replace(/\s/g, '-').replace(/[^\w-]/g, '')

/**
 * Decodes a string that has been encode through the 'url_encode' Shopify filter
 * @param {*} str
 */
export const decode = str => decodeURIComponent(str).replace(/\+/g, ' ')

/**
 * Compare scroll position of an element
 *
 * @param {*} item
 * @param {*} tolerance
 */
export const getScrollTop = (el = document.documentElement) => el === document.documentElement ? (window.pageYOffset || el.scrollTop) : el.scrollTop

export const getTopOffset = (el) => el.getBoundingClientRect().top + getScrollTop()

export const has = (item, selector) => {
  return item.classList.contains(selector)
}

export const getIndex = (item) => {
  let nodes = Array.prototype.slice.call(item.parentNode.children)
  let index = parseInt(nodes.indexOf(item))
  return index
}

export const isVisible = (el) => {
  let top = el.offsetTop
  let left = el.offsetLeft
  let width = el.offsetWidth
  let height = el.offsetHeight

  while (el.offsetParent) {
    el = el.offsetParent
    top += el.offsetTop
    left += el.offsetLeft
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  )
}

export const write = (el, value) => {
  el.innerHTML = value
}

export const debounce = (func, delay) => {
  let inDebounce
  return function () {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
  }
}

export const arrowShape = 'M73.302 2.353L26.61 49.5M73.302 96.647L26.61 49.5'

export const supportsObjectFit = () => {
  let objectFit = false
  for (let prop in document.documentElement.style) {
    if (/object(?:-f|F)it$/.test(prop)) {
      objectFit = true
      break
    }
  }
  return objectFit
}

/**
 * Given a Storefront Id string, parse out the id
 *
 * Storefront Ids are base64 encoded. Leverage atob() to decode them.
 * https://bit.ly/3hCdyxX
 *
 * @param {String} storefrontId
 * @returns {String} id
 */
export const parseStorefrontId = storefrontId => (
  atob(storefrontId).split('/')[4]
)

const _getQueryPattern = (key) => new RegExp(`[?&]${key}=([^&]+)`)

export const getQueryVar = (key, url = window.location.href) => {
  const pattern = _getQueryPattern(key)
  const matches = url.match(pattern)
  return matches ? matches[1] : ''
}
