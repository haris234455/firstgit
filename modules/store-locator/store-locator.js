import 'lib/map-override'

export default {
  init (el) {
    var $select = $(el).find('select')
    var $addresses = $(el).find('#addresses_list')
    var $map = $(el).find('#store_map')

    // For each select element found in the form :
    $select.each(function () {
      var $select = $(this)
      var $on = $select.find('option:selected')
      var focus = 'dropdown--focus'
      var open = 'dropdown--open'
      var value = $on.text()

      // Wrap select element them in custom select.
      $select.wrap('<span class="dropdown dropdown--classic"></span>')
      var $dropdown = $select.parent()

      // Add element to display select value.
      $dropdown.prepend('<i class="dropdown__holder">' + value + '</i>')
      var $holder = $select.siblings('.dropdown__holder')

      // Remove class to select element to avoid style conflict.
      $select.removeAttr('class')

      // On select change event, set text to selected option.
      $select.on('change', function () {
        var $this = $(this)
        var $c = $this.find('option:selected')

        $holder.text($c.text())
      })

      // On select focus event, add focus style to custom select.
      $select.on('focus', function () {
        var $this = $(this)
        $dropdown.addClass(focus)
      })

      // On select blur event, remove focus style to custom select.
      $select.on('blur', function () {
        $dropdown.removeClass(focus)
      })
    })

    // Add white gradiant on bottom of scrollable addresses list.
    if ($addresses.outerHeight(true) < $addresses.children().outerHeight(true)) {
      $addresses.addClass('scrolling')
    }

    // Handle white gradiant display depending on scrolling position in addresses list.
    $addresses.on('scroll', function () {
      var $this = $(this)

      if ($this.scrollTop() + $this.innerHeight() >= $this[ 0 ].scrollHeight) {
        $this.removeClass('scrolling')
      } else {
        $this.addClass('scrolling')
      }
    })

    // Initialize new map.
    initialize()

    // // Remove old map after new one is fully loaded.
    $(window).load(function () {
      $map.children().first().remove()
    })
  },
  destroy () {}
}
