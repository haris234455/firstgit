export default {
  init (el) {
    $('.featured-recipes__image, .featured-recipes__icon').on('click', function () {
      var $parent = $(this).closest('.featured-recipes__video-wrap')
      var url = $parent.attr('data-video')
      $parent.find('.featured-recipes__image, .featured-recipes__icon').fadeOut()
      $parent.find('.featured-recipes__video').attr('src', 'https://www.youtube.com/embed/' + url + '?autoplay=1')
    })
  },
  destroy () {}
}
