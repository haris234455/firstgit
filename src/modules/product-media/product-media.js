export default {
  init (el) {
    var productLifestyle = $(el).find('.product-lifestyle')
    var video = $(el).find('.product-demo__video')
    var thb = $(el).find('.product-demo__thumbnail')
    var btn = thb.find('.product-demo__btn-play ')
    var youtubeURL = video.attr('data-src') + '&autoplay=1'
    var lifestyle = true
    var speed = 300

    // Fix YouTube video caching issues when coming back / leaving the page.
    video.attr('src', '')

    // Autoplay video and fade out video thumbnail when clicking on 'play' video button.
    btn.on('click', function () {
      video.attr('src', youtubeURL)
      setTimeout(function () {
        thb.stop(true, true).fadeOut(speed)
      }, 200)
    })
  },
  destroy () {}
}
