import cart from 'lib/cart'
import eventBus from 'lib/eventBus'
import select from 'select-dom'

export default {
  init (el) {
    // Initialize objects.
    var $content = $(el).parents('.main-content')
    var $main = $(el).siblings('.main')
    var $triggerSearch = $(el).find('[data-trigger="search"]')
    var $triggerMobile = $(el).find('[data-trigger="mobile-nav"]')
    var $trigger = $triggerSearch.add($triggerMobile)
    var $triggerDropdowns = $(el).find('[data-drop]')
    var $drawer = $(el).parents('body').find('[data-item="drawer"]')
    var $overlay = $(el).parents('body').find('.overlay-g')
    var $sectionHero = $('#shopify-section-home-hero')
    var $headerCartCount = $(el).find('.js-cart-count')
    var $navMenu = $(el).find('.js-nav')
    var $navContainer = $(el).find('.js-nav-container')
    var $navList = $(el).find('.js-nav-list')
    var $navItemDetailEls = $(el).find('.js-nav-item-detail')
    var $accordionToggleEls = $drawer.find('.js-nav-accordion-toggle')

    // Initialize constants.
    var activeSearch = $triggerSearch.attr('class') + '--active'
    var activeMobile = $triggerMobile.attr('class') + '--active'
    var search = $drawer.attr('class') + '--search-on'
    var mobile = $drawer.attr('class') + '--mobile-on'
    var open = 'main-content--nav-open'
    var breakpoint = 1000
    var speed = 400
    var index = $drawer.css('z-index')
    var headerStickyClass = 'header--sticky'
    var headerStickyOpenClass = 'header--sticky-open'
    var scrollTimeount = null
    var isNavOpenClass = 'is-nav-open'
    var isOpenClass = 'is-open'

    // Initialize functions.
    var trigger = function () {
      $overlay.off('click')

      if ($drawer.hasClass(search)) $triggerSearch.trigger('click')

      if ($drawer.hasClass(mobile)) $triggerMobile.trigger('click')

      setTimeout(function () {
        $overlay.on('click', trigger)
      }, speed)
    }

    var hide = function () {
      $drawer.css({
        'top': -($drawer.outerHeight(true)),
        'z-index': '-999'
      })
    }

    var getHeader = function () {
      return $(el).outerHeight(true) + parseInt($(el).css('top'))
    }

    var getPosition = function () {
      if ($drawer.hasClass(search) || $drawer.hasClass(mobile)) {
        return getHeader()
      } else {
        return -($drawer.outerHeight(true))
      }
    }

    var display = function () {
      var top = getPosition()

      // Reset z-index (fix for mobile).
      $drawer.css('z-index', index)

      $drawer.stop(true, true).animate({
        'top': top
      }, speed)
    }

    // Initialize drawer.
    hide()
    $drawer.css('max-height', 'calc(100% - ' + getHeader() + 'px)')

    // Handle 'click' events on 'trigger links'.
    $trigger.on('click', function (e) {
      if (e.type === 'click') {
        var $this = $(this)
        var trigger = $this.attr('data-trigger')
        var active

        switch (trigger) {
          // Link triggers 'search bar' to display in 'drawer'.
          case 'search':
            active = activeSearch
            $drawer.toggleClass(search)
            if (e.eventPhase === 2) {
              $drawer.find('input').first().val('').focus()
            }
            break
          // Link triggers 'mobile navigation' to display in 'drawer'.
          case 'mobile-nav':
            if ($triggerMobile.hasClass('mobile-burger--active')) {
              $triggerMobile.attr('aria-label', 'open menu')
            } else {
              $triggerMobile.attr('aria-label', 'close menu')
            }
            active = activeMobile
            $drawer.toggleClass(mobile)
            break
        }

        // Display drawer.
        display()

        // Add active class to 'trigger link'.
        $this.toggleClass(active)

        // Disable scrolling on page.
        $content.toggleClass(open)
        $('body').toggleClass('js-drawer-open')

        // If 'overlay' is 'visible' hide it, else show it.
        if ($overlay.is(':visible')) {
          $overlay.stop(true, true).fadeOut(speed)
        } else {
          $overlay.stop(true, true).fadeIn(speed)
        }

        // Open first item automatically
        if ($accordionToggleEls.length) {
          $($accordionToggleEls[0]).trigger('click')
        }
      }
    })

    $('.mobile-nav-newsletter__btn').focusout(() => {
      $('.mobile-burger').focus()
    })

    // Handle 'click' events on 'overlay'.
    $overlay.on('click', trigger)

    // Handle 'drawer' behavior on 'window' resize.
    $(window).resize(function () {
      var screen = $(window).width()

      // Allow drawer to be scrollable.
      $drawer.css('max-height', 'calc(100% - ' + getHeader() + 'px)')

      // If 'overlay' is visible.
      if ($overlay.is(':visible')) {
        if (screen >= breakpoint) {
          // If 'screen' width is superior to breakpoint, display 'search bar' in 'drawer'.
          $drawer.addClass(search).removeClass(mobile)
          $triggerSearch.addClass(activeSearch)
          $triggerMobile.removeClass(activeMobile)
          $triggerMobile.setAttribute('aria-label', 'open-menu')
        } else {
          // Else display 'mobile nav' in 'drawer'.
          $drawer.addClass(mobile).removeClass(search)
          $triggerMobile.addClass(activeMobile)
          $triggerMobile.setAttribute('aria-label', 'close menu')
          $triggerSearch.removeClass(activeSearch)
        }
        display()
      } else {
        hide()
      }
    })

    $('.search-bar__btn[type="submit"]').focusout(function () {
      hide()
      $triggerSearch.removeClass(activeSearch)
      $triggerSearch.focus()
      $drawer.toggleClass(search)
      $overlay.stop(true, true).fadeOut(speed)
    })

    const stickyHeaderOnScroll = () => {
      const scroll = window.pageYOffset
      const threshold = $sectionHero.outerHeight()

      if (scroll > threshold) {
        stickHeader()
        return
      }

      unstickHeader()
    }

    const stickHeader = () => {
      el.classList.add(headerStickyClass)

      // Add open transition class after element is set to fixed
      // so CSS animation is applied correctly
      scrollTimeount = setTimeout(() => {
        el.classList.add(headerStickyOpenClass)
      }, 0)
    }

    const unstickHeader = () => {
      el.classList.remove(headerStickyOpenClass)
      el.classList.remove(headerStickyClass)
      clearTimeout(scrollTimeount)
    }

    if ($sectionHero.length) {
      stickyHeaderOnScroll()
      $(window).scroll(stickyHeaderOnScroll)
    }

    // Handle 'hover' events on 'dropdown trigger link'.
    $triggerDropdowns.each(function () {
      let $dropdown = $(this).next('[data-item="dropdown"]')
      $(this).add($dropdown).on('mouseover keydown', (e) => {
        if (e.keyCode === 13 || !e.keyCode) {
          e.preventDefault()
          if (!$overlay.is(':visible')) {
            var dropdown = $dropdown.children().outerHeight(true)
            $dropdown.css({'height': dropdown})
            $('body').addClass(isNavOpenClass)
            $dropdown.addClass(isOpenClass)
          }
        }
      }).on('mouseout', () => {
        if (!$dropdown.is(':hover')) {
          $('body').removeClass(isNavOpenClass)
          $dropdown.removeClass(isOpenClass)
        }
      })
      $('.main-dropdown--nav .dropdown-nav__item:last-child .dropdown-nav__sub-item:last-child a').focusout(() => {
        if (!$dropdown.is(':hover')) {
          $('body').removeClass(isNavOpenClass)
          $dropdown.removeClass(isOpenClass)
        }
      })
      $dropdown.find('.main-dropdown__item:last-child a').focusout(function () {
        $('body').removeClass(isNavOpenClass)
        $dropdown.removeClass(isOpenClass)
      })
    })

    // Update cart count after added to cart
    if ($headerCartCount) {
      eventBus.$on('add-to-cart', () => {
        cart.get()
          .then(data => $headerCartCount.text(data.item_count))
      })
    }

    const setNavPosition = () => {
      if ($navMenu.length) {
        const navParent = $navMenu.parent()
        const parentOffset = navParent[0].getBoundingClientRect()
        const windowWidth = document.body.clientWidth

        $navMenu.css({
          'left': `-${parentOffset.left}px`,
          'width': `${windowWidth}px`
        })
      }
    }

    const setWidthNavItemDetail = () => {
      if ($navItemDetailEls.length && $navList.length && $navContainer.length) {
        var navListRight = $navList[0].getBoundingClientRect().right
        var navContainerRight = $navContainer[0].getBoundingClientRect().right
        $navItemDetailEls.css({'width': `${navContainerRight - navListRight}px`})
      }
    }

    const accordionHandler = () => {
      if (!$accordionToggleEls.length) {
        return false
      }

      const ACCORDION_ACTIVE = 'mobile-nav__accordion--active'

      $accordionToggleEls.on('click', function (e) {
        const accordion = $(this).closest('.mobile-nav__accordion')
        const accordionList = accordion.find('.mobile-nav__accordion-content')[0]

        accordion.toggleClass(ACCORDION_ACTIVE)
        $(this).attr('aria-expanded', accordion.hasClass(ACCORDION_ACTIVE))
        if (accordionList) accordionList.style.maxHeight = accordion.hasClass(ACCORDION_ACTIVE) ? `${accordionList.scrollHeight}px` : 0
      })
    }

    setNavPosition()
    setWidthNavItemDetail()
    accordionHandler()

    $(window).on('resize', function () {
      setNavPosition()
      setWidthNavItemDetail()
    })

    const paginationNextEl = select('#shopify-product-reviews')
    if (paginationNextEl) {
      const observer = new window.MutationObserver((mutations) => {
        if (mutations.length) {
          const nextButton = select('.spr-pagination-next a')
          const prevButton = select('.spr-pagination-prev a')
          if (nextButton) {
            nextButton.setAttribute('aria-label', 'Next')
          }
          if (prevButton) {
            prevButton.setAttribute('aria-label', 'Prev')
          }
        }
      })

      observer.observe(paginationNextEl, {
        childList: true,
        subtree: true
      })
    }
  },
  destroy () {}
}
