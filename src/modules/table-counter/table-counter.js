export default {
  init (el) {
    var counter = 'table-counter'
    /**
     * Wrap counter element in custom counter.
     */
    $(el).wrap('<div class="' + counter + ' clearfix"></div>')
    var $counter = $(el).parents('.' + counter)
    var $product = $(el).closest('.table-cart__product')
    var $targetMobile = $product.find('[data-counter="mobile"]')
    var $targetDesktop = $product.find('[data-counter="desktop"]')
    var min = $(el).attr('min')
    var max = $(el).attr('max')
    var field = counter + '__field'
    var up = counter + '__action-up'
    var down = counter + '__action-down'
    var action = counter + '__action'
    var spinner = function (e) {
      var $this = $(e.currentTarget)
      var $field = $this.siblings('.' + field)
      var value = $field.val()

      if ($this.hasClass(up)) {
        value++
      } else {
        value--
      }

      if (typeof max !== typeof undefined && max !== false) {
        if ($this.hasClass(up) && value <= max) {
          $field.val(value)
        }
        if ($this.hasClass(down) && value >= min) {
          $field.val(value)
        }
      } else {
        if (value >= min) {
          $field.val(value)
        }
      }
    }
    var cloning = function ($base, $wrapper) {
      var $clone = $base.clone()

      $clone.appendTo($wrapper)
      $base.remove()
      $clone.find('.' + action).on('click', spinner)
    }

    /**
     * Style original counter field.
     */
    $(el).addClass(field)

    /**
     * Add action buttons to custom counter.
     */
    $counter.prepend('<button class="' + down + ' ' + action + '" type="button">-</button>')
    $counter.append('<button class="' + up + ' ' + action + '" type="button">+</button>')

    /**
     * When clicking on an action button, increment or decrement counter value.
     */
    $counter.find('.' + action).on('click', spinner)

    /**
     * On load, if window width is inferior to 660px, clone custom counter to new emplacement.
     */
    if ($(window).width() < 660) {
      cloning($counter, $targetMobile)
    }

    /**
     * Handle table display depending on window size.
     */
    $(window).resize(function () {
      var width = $(window).width()
      var $counterMobile = $targetMobile.find('.' + counter)
      var $counterDesktop = $targetDesktop.find('.' + counter)

      if (width < 660 && $counterMobile.length <= 0) {
        cloning($counterDesktop, $targetMobile)
      }
      if (width >= 660 && $counterDesktop.length <= 0) {
        cloning($counterMobile, $targetDesktop)
      }
    })
  },
  destroy () {}
}
