import select from 'select-dom'
import on from 'dom-event'
import { set, unset, contains, getHeight } from 'lib/util'

const ACCORDION_ACTIVE_CLASS = 'is-item-active'
const ACCORDION_FOCUS_CLASS = 'is-focus'
const ACCORDION_CONTENT_SELECTOR = '.js-tab-content'
const ACCORDION_BUTTON_SELECTOR = '.js-tab-btn'
const ACCORDION_ITEM_SELECTOR = '.js-tab-item'
const OPEN_CLASS = 'js-tab-open'
const TAB_OPEN_CLASS = 'open'
const TAB_BUTTON_PART_SELECTOR = '.js-tab-button'
const TAB_CONTENT_PART_SELECTOR = '.js-tab-content'

const close = (button, accordion, content) => {
  unset(accordion, ACCORDION_ACTIVE_CLASS)
  unset(button, ACCORDION_FOCUS_CLASS)
  content.style.height = '0px'
}

export default (el) => {
  const list = select.all(ACCORDION_ITEM_SELECTOR)
  if (list.length) {
    const toggleDescription = (button) => {
      const accordion = button.parentNode
      const content = accordion ? select(ACCORDION_CONTENT_SELECTOR, accordion) : ''
      if (accordion && content) {
        if (!contains(accordion, ACCORDION_ACTIVE_CLASS)) {
          set(accordion, ACCORDION_ACTIVE_CLASS)
          content.style.height = getHeight(content.children[0])
        } else {
          close(button, accordion, content)
        }
      }
    }

    list.map((item, index) => {
      const button = select(ACCORDION_BUTTON_SELECTOR, item)
      if (button) {
        if (index < 2 && contains(item, OPEN_CLASS)) {
          toggleDescription(button)
        }
        on(button, 'click', () => {
          toggleDescription(button)
        })
      }
    })

    on(window, 'resize', () => {
      const active = select('.' + ACCORDION_ACTIVE_CLASS, el)
      if (active) {
        const content = select(ACCORDION_CONTENT_SELECTOR, active)
        content.style.height = getHeight(content.children[0])
      }
    })
  }

  const tabPart = select.all(TAB_BUTTON_PART_SELECTOR)
  const firstActiveButton = select(TAB_BUTTON_PART_SELECTOR)
  const firstActiveContent = select(TAB_CONTENT_PART_SELECTOR)
  if (firstActiveButton) {
    set(firstActiveButton, TAB_OPEN_CLASS)
  }

  if (firstActiveContent) {
    set(firstActiveContent, TAB_OPEN_CLASS)
  }

  if (tabPart.length > 1) {
    const removeClass = (list, cls) => {
      if (list.length > 0) {
        list.map(item => {
          unset(item, cls)
        })
      }
    }

    const toggleTab = (id) => {
      const tabActiveEl = document.getElementById(id)
      const tabContentEls = select.all(TAB_CONTENT_PART_SELECTOR)
      removeClass(tabContentEls, TAB_OPEN_CLASS)

      if (tabActiveEl) {
        set(tabActiveEl, TAB_OPEN_CLASS)
      }
    }

    tabPart.map(item => {
      on(item, 'click', () => {
        const id = item.getAttribute('data-tab')
        removeClass(tabPart, TAB_OPEN_CLASS)
        set(item, TAB_OPEN_CLASS)
        toggleTab(id)
      })
    })
  }
}
