import zoom from 'jquery-zoom'
import ScrollMagic from 'scrollmagic'
import { TimelineMax } from 'gsap/all'
import 'animation.gsap'

const BREAKPOINT_DESKTOP = 769
const $headerEl = $('.js-header')

export default {
  init (el) {
    var $productGallery = $(el).find('.js-product-gallery')
    var $productThumbnails = $(el).find('.js-product-thumbnails')
    var $imgHolder = $(el).find('.product-single__holder')
    var $thbList = $(el).find('.product-thumbnails__list')
    var $thbItem = $(el).find('.product-thumbnails__item')
    var $galleryList = $(el).find('.product-gallery__list')
    var $galleryListActive = $(el).find('.product-gallery__list:not(.product-gallery__list--hidden)')
    var $thbListActive = $(el).find('.product-thumbnails__list:not(.product-thumbnails__list--hidden)')
    var $media = $('body').find('.js-media')
    var $mainBtn = $(el).find('.js-add-to-cart')
    var $orderType = $(el).find('.js-order-type')
    var $preorderMsg = $(el).find('.js-preorder-msg')
    var $anchorBtn = $(el).find('.js-anchor-bottom')
    var active = 'product-thumbnails__item--active'
    var hidden = 'product-thumbnails__list--hidden'
    var hiddenGallery = 'product-gallery__list--hidden'
    var buttonActive = 'is-anchor-active'
    var scene, controller

    if ($anchorBtn) {
      $anchorBtn.on('click', function () {
        const productNav = $('.js-product-nav')
        let offset = $(el).next().offset().top
        offset -= productNav ? $(productNav).height() : 0
        $('html, body').animate({
          scrollTop: offset
        }, 500)
      })
    }

    $thbList.each(function (i) {
      $('.js-gallery-item-fade-' + i).wrapAll('<div class="product-gallery__fade-wrapper js-list-fade"></div>')
    })

    const activeThumbnail = (thbList, index) => {
      const $thubItems = $(thbList).find('.product-thumbnails__item')
      if ($thubItems.length) {
        $($thubItems).removeClass(active)
        $($thubItems[index]).addClass(active)
      }
    }

    const centerProductThumbnail = () => {
      if ($productThumbnails) {
        const headerHeight = $headerEl ? $headerEl.height() : 0
        const top = (window.innerHeight - $productThumbnails.height() - headerHeight - 45) / 2
        $productThumbnails.css({'padding-top': window.innerWidth >= BREAKPOINT_DESKTOP ? `${top}px` : ''})
      }
    }

    centerProductThumbnail()

    $(window).on('resize', function () {
      centerProductThumbnail()
    })

    if (window.innerWidth >= BREAKPOINT_DESKTOP) {
      const initScrollMagic = (container) => {
        if (container) {
          const galleryItem2 = '.js-gallery-item:nth-child(2)'
          const galleryItem3 = '.js-gallery-item:nth-child(3)'
          const galleryItem4 = '.js-gallery-item:nth-child(4)'
          if (scene) {
            controller.destroy(true)
            scene.destroy()
            scene = null
          }
          controller = new ScrollMagic.Controller()
          const animationItem2 = new TimelineMax()
            .fromTo(galleryItem2, 0.25, { autoAlpha: 0 }, { autoAlpha: 1 }, 1)
            .fromTo(galleryItem3, 0.25, { autoAlpha: 0 }, { autoAlpha: 1 }, 3)
            .fromTo(galleryItem4, 0.25, { autoAlpha: 0 }, { autoAlpha: 1 }, 4)

          scene = new ScrollMagic.Scene({
            triggerElement: container,
            triggerHook: 'onLeave',
            duration: container.offsetHeight * 3,
            offset: (container.offsetHeight - window.innerHeight) / 2
          })
            .setPin(container)
            .setTween(animationItem2)
            .addTo(controller)
        }
      }

      // init controller
      const container = document.querySelector('.product-gallery__list:not(.product-gallery__list--hidden) .js-list-fade')
      if (container) {
        initScrollMagic(container)
      }
      $('.product-gallery__desktop').on('changeScrollEml', function (event) {
        const container = event.target.find('.js-list-fade')
        if (container) {
          initScrollMagic(container[0])
        }
      })
      $.fn.isInViewport = function (offset = 0) {
        let elementTop = $(this).offset().top + offset
        let elementBottom = elementTop + $(this).outerHeight() + offset

        let viewportTop = $(window).scrollTop()
        let viewportBottom = viewportTop + $(window).height()

        return elementBottom > viewportTop && elementTop < viewportBottom
      }
      $(window).scroll(function () {
        $anchorBtn.addClass(buttonActive)
        if ($galleryListActive) {
          var $galleryItems = $galleryListActive.find('.js-gallery-item')
          $galleryItems.each(function (i, elm) {
            if (i <= 2 && parseInt($(elm).css('opacity')) === 1) {
              activeThumbnail($thbListActive, i)
            }
            if (i > 3 && $(elm).isInViewport(window.innerHeight / 2)) {
              activeThumbnail($thbListActive, i)
            }
          })
        }
      })

      $thbItem.on('click', function (e) {
        if (window.innerWidth >= BREAKPOINT_DESKTOP) {
          const index = parseInt($(e.target).attr('data-index'))
          const $galleryItems = $galleryListActive.find('.js-gallery-item')
          const $galleryItem = index && $galleryItems ? $galleryItems[index - 1] : ''
          if ($galleryItem) {
            var offset = $($galleryItem).offset().top
            var galleryOffset = $productGallery.offset().top
            if (index === 1) {
              offset = galleryOffset
            }
            if (index === 2) {
              offset = galleryOffset + $($galleryItems[0]).height() * 2
            }
            if (index === 3 || index === 4) {
              offset = galleryOffset + $($galleryItems[0]).height() * 3 + 20
            }
            $('html, body').animate({
              scrollTop: offset
            }, 500)
          }
        }
      })
    }

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Zoom on main featured image on click and grab.
      $imgHolder.on('touchstart', this, function () {
        $imgHolder.on('touchend', function (e) {
          $imgHolder.zoom({
            magnify: 1.5,
            on: 'click',
            touch: true,
            onZoomOut: function () {
              $imgHolder.trigger('zoom.destroy')
            }
          })
          $imgHolder.off('touchend')
        })
        $imgHolder.on('touchmove', function (e) {
          $imgHolder.off('touchend')
        })
      })
    } else {
      // Zoom on main featured image on hover.
      $imgHolder.zoom({
        magnify: 1.5,
        on: 'click',
        touch: false
      })
    }

    // Store zoomed image.
    var $imgZoom = $imgHolder.find('.zoomImg')

    // Initialize first thumbnail to be active.
    $thbList.children(':first-child').addClass(active)

    // Preload all real original size thumbnail images before user click on them.
    $(window).on('load', function () {
      var preloadImg = []
      var i = 0

      $thbItem.find('img').each(function () {
        var $this = $(this)
        var dataSrc = $this.attr('data-thumbnail')

        preloadImg[ i ] = new Image()
        preloadImg[ i ].src = dataSrc
        i++
      })
    })

    // When clicking on thumbnail change featured image.
    $thbItem.find('img').on('click', function () {
      var $this = $(this)
      var $targetItem = $this.parent('li')
      var $targetList = $targetItem.parent('ul')
      var view = $this.attr('data-thumbnail')

      // Set clicked thumbnail as 'active'.
      if (!$targetItem.hasClass(active)) {
        $imgHolder.find('img').attr('src', view)
        $targetList.find('.' + active).removeClass(active)
        $targetItem.addClass(active)
      }
    })

    const setSelectLabel = (el, label) => {
      el && label && el.setAttribute('aria-label', label)
    }

    // Multi-selector
    const selectCallback = (variant, selector) => {
      const variantMetafields = (window.productJSON.metafields || []).find(item => variant.id === item.id)
      if (variantMetafields) {
        const preorder = variantMetafields.preorder
        // Disable unavailable options based on option1 selection
        let productVariants = selector.product.variants
        let option2SelectOptions = $('[data-option="option2"] option')
        option2SelectOptions.hide()

        // 'Add to Cart' button state
        if (variant) {
          // Loop through variants of selected option1 value, show available option2 values
          let selectedOption1 = variant.option1

          productVariants.forEach((variant) => {
            if (variant.option1 === selectedOption1) {
              $(`[data-option="option2"] option[value="${variant.option2}"]`).show()
            }
          })

          if (variant.available || preorder) {
            // Selected a valid variant that is available.
            $('#purchase').removeClass('disabled').removeAttr('disabled').fadeTo(200, 1)
            if (preorder) {
              $preorderMsg.show()
              $mainBtn.val('Pre-Order')
              $orderType.val('Pre-Order')
            } else {
              $preorderMsg.hide()
              $mainBtn.val('Add to Cart')
              $orderType.val('Regular')
            }
          } else {
            // Variant is sold out.
            $('#purchase').val('Sold Out').addClass('disabled').attr('disabled', 'disabled').fadeTo(200, 0.5)
          }

          // Whether the variant is in stock or not, we can update the price and compare at price.
          if (variant.compare_at_price > variant.price) {
            $('.js-compare-price-field').html('<span class="product-compare-price strike" aria-label="original price: ' + Shopify.formatMoney(variant.compare_at_price, '') + '">' + Shopify.formatMoney(variant.compare_at_price, '') + '</span>')
            $('.js-price-field').html('<span class="product-price on-sale" aria-label="sale price: ' + Shopify.formatMoney(variant.price, '') + '">' + Shopify.formatMoney(variant.price, '') + '</span>')
          } else {
            $('.js-compare-price-field').html('')
            $('.js-price-field').html('<span class="product-price">' + Shopify.formatMoney(variant.price, '') + '</span>')
          }
        } else {
          // Select first available option2
          let selectedOption1 = $('[data-option="option1"]').val()
          let option2Select = $('[data-option="option2"]')
          let option2Holder = option2Select.siblings('.dropdown__holder')[0]
          let firstSelected = false

          productVariants.forEach((variant) => {
            if (variant.option1 === selectedOption1) {
              $(`[data-option="option2"] option[value="${variant.option2}"]`).show()
              if (firstSelected === false) {
                option2Select.val(variant.option2).change()
                firstSelected = true
              }
            }
          })
        }
      }
      setSelectLabel(selector.selectors[0].element, selector.variantIdField.ariaLabel)
    }

    // Initialize multi selector for product
    jQuery(($) => {
      var variantCount = $(el).data('variants')
      if (variantCount > 1) {
        // eslint-disable-next-line no-new
        new Shopify.OptionSelectors('product-select', { product: productJSON, onVariantSelected: selectCallback })
      }
    })

    // For each select which has the data-option attribute.
    var $select = $(el).find('select')

    $select.each(function () {
      var $this = $(this)

      if ($this[ 0 ].hasAttribute('data-option')) {
        var option = $this.attr('data-option').toLowerCase().trim()

        // On select 'option' value ('variant') change.
        $this.on('change', function () {
          var variant = $this.find('option:selected').text().toLowerCase().trim().replace(' ', '-').replace('.', '-')
          var variantId = $this.find('option:selected').val()
          var price = $this.find('option:selected').attr('data-price')
          var sale = $this.find('option:selected').attr('data-sale')
          var $targetThbList = $(el).find('*.product-thumbnails__list[data-target="' + 'color' + '-' + variant + '"]')
          var $targetGalleryList = $(el).find('*.product-gallery__list[data-target="' + 'color' + '-' + variant + '"]')
          var currentView = $targetThbList.children('.' + active).find('img').attr('data-thumbnail')

          // Set 'featured' image to current active thumbnail.
          if (option === 'option1') {
            $imgHolder.find('img').attr('src', currentView)
            // Hide current thumbnails.
            $thbList.addClass(hidden)
            $galleryList.addClass(hiddenGallery)

            // Show targeted thumbnails.
            $targetThbList.toggleClass(hidden)

            if (window.innerWidth >= BREAKPOINT_DESKTOP) {
              $targetGalleryList.toggleClass(hiddenGallery)
              $galleryListActive = $targetGalleryList
              $thbListActive = $targetThbList
              $('.product-gallery__desktop').trigger({
                type: 'changeScrollEml',
                target: $targetGalleryList
              })
              $('html, body').animate({
                scrollTop: 0
              }, 500)
            }
          }

          if ($media.length > -1) {
            $media.find('.js-lifestyle').each(function () {
              if ($(this).attr('data-variant-id') === variantId) {
                $(this).addClass('is-active')
              } else {
                $(this).removeClass('is-active')
              }
            })
          }
        })
      }
    })
  },
  destroy () {}
}
