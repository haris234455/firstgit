import Flickity from 'flickity-as-nav-for'
import select from 'select-dom'
import { on, off } from 'dom-event'
import {
  set,
  unset
} from 'lib/util'

const ACTIVATE_NAV_CLASS = 'is-tab-active'
const FIX_NAV_CLASS = 'is-tab-fix'
const NAV_SELECTOR = '.js-slider-nav'
const TAB_CONTENT_SELECTOR = '.js-tab-content'
const TAB_ITEM_SELECTOR = '.js-tab-content-item'
const VARIANT_SELECT_SELECTOR = '[data-option]'
const BREAKPOINT_TABLET = 900
const args = {
  prevNextButtons: false,
  pageDots: false,
  groupCells: false,
  cellAlign: 'left'
}

const addActivateClass = (elms) => set(elms, ACTIVATE_NAV_CLASS)
const removeActivateClass = (elms) => unset(elms, ACTIVATE_NAV_CLASS)
const isDesktop = (windowWidth) => windowWidth >= BREAKPOINT_TABLET

export default el => {
  const tabButtons = select.all('.js-product-tab-nav', el)
  const tabItems = select.all(TAB_ITEM_SELECTOR, el)
  const navEl = select(NAV_SELECTOR, el)
  const tabContentWrapper = select(TAB_CONTENT_SELECTOR, el)
  const variantSelects = select.all(VARIANT_SELECT_SELECTOR)
  let tabIndex = 0
  let autoTab
  let flickityNav = null
  let flickityContent = null

  if (tabButtons.length) {
    const setHeightTabContent = (firstTime = false) => {
      const selectedClass = TAB_ITEM_SELECTOR + '.' + ACTIVATE_NAV_CLASS
      const selectedElm = firstTime ? tabItems[0] : el.querySelector(selectedClass)
      const childSelectedElm = selectedElm ? selectedElm.querySelector('div') : ''
      const height = childSelectedElm ? childSelectedElm.offsetHeight : 0
      tabContentWrapper.style['height'] = height + 'px'
    }

    const activeTab = (key) => {
      tabIndex = key
      unset(tabButtons, FIX_NAV_CLASS)
      removeActivateClass(tabButtons)
      removeActivateClass(tabItems)
      addActivateClass(tabButtons[key])
      if (tabItems[key]) addActivateClass(tabItems[key])
      setHeightTabContent()
    }

    const autoRunTab = () => {
      tabIndex = tabIndex === tabButtons.length - 1 ? 0 : tabIndex + 1
      activeTab(tabIndex)
    }

    const initAutoPlay = () => {
      const windowWidth = window.innerWidth
      if (autoTab) {
        clearInterval(autoTab)
      }
      activeTab(0)
      if (isDesktop(windowWidth)) {
        autoTab = setInterval(autoRunTab, 6000)
      }
      tabButtons.map((button, key) => {
        on(button, 'click', () => {
          activeTab(key)
          set(tabButtons[key], FIX_NAV_CLASS)
          if (isDesktop(windowWidth)) {
            clearInterval(autoTab)
          }
        })
      })
    }

    const onScrollHandler = () => {
      const windowHeight = window.innerHeight
      const elTopPos = el.getBoundingClientRect().top

      // If module is in the viewport then start auto play
      if (elTopPos < windowHeight) {
        initAutoPlay()
        off(window, 'scroll', onScrollHandler)
      }
    }

    const onVariantChangeHandler = () => {
      if (variantSelects.length) {
        variantSelects.map((variantSelect) => {
          on(variantSelect, 'change', function () {
            on(window, 'scroll', onScrollHandler)
          })
        })
      }
    }

    const initFlickity = () => {
      if (tabContentWrapper) {
        tabContentWrapper.style['height'] = ''
        flickityContent = new Flickity(tabContentWrapper, args)
      }

      if (navEl) {
        flickityNav = new Flickity(navEl, {
          asNavFor: tabContentWrapper,
          prevNextButtons: false,
          pageDots: false,
          contain: true,
          cellAlign: 'left'
        })
      }
    }

    const initProductTab = () => {
      if (flickityNav) flickityNav.destroy()
      if (flickityContent) flickityContent.destroy()
      if (autoTab) clearInterval(autoTab)

      if (isDesktop(window.innerWidth)) {
        setHeightTabContent(true)
        on(window, 'scroll', onScrollHandler)
        onVariantChangeHandler()
      } else {
        initFlickity()
      }
    }

    on(window, 'load', initProductTab)
    on(window, 'resize', initProductTab)
  }
}
