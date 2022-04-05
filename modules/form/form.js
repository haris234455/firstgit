export default {
  init (el) {
    var $selects = $(el).find('select:not(:hidden)')

    /**
     * For each select element found in the form...
     */
    $selects.each(function () {
      var $s = $(this)
      var $on = $s.find('option:selected')
      var focus = 'dropdown--focus'
      var open = 'dropdown--open'
      var value = $on.text()

      /**
       * Wrap select element in custom select.
       */
      if ($s[0].hasAttribute('data-label')) {
        $s.wrap('<span class="' + $s.attr('class') + '"></span>')
      }

      var $p = $s.parent()

      /**
       * Add element to display select value.
       */
      $s.before('<i class="dropdown__holder">' + value + '</i>')
      var $h = $s.siblings('.dropdown__holder')

      if (typeof $s.attr('data-label') !== typeof undefined && $s.attr('data-label') !== false) {
        /**
         * Add label data.
         */
        $p.prepend('<span class="dropdown__label">' + $s.attr('data-label') + '</span>')
      }

      // /**
      //  * Remove class to select element to avoid style conflict.
      //  */
      $s.removeAttr('class')

      $s
        /**
         * On select change event, set text to selected option.
         */
        .on('change', function () {
          var $c = $(this).find('option:selected')

          $h.text($c.text())
        })
        /**
         * On select focus event, add focus style to custom select.
         */
        .on('focus', function () {
          var $this = $(this)
          $p.addClass(focus)
        })
        /**
         * On select blur event, remove focus style to custom select.
         */
        .on('blur', function () {
          $p.removeClass(focus)
        })
    })
  },
  destroy () {}
}
