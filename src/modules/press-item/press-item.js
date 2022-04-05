export default {
  init (el) {
    var redirect = $(el).find('.press-item__link').attr('href')

    /**
     * Redirect to article page when clicking on press item.
     */
    $(el).on('click', function () {
      window.location.href = redirect
    })
  },
  destroy () {}
}
