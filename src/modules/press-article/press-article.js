export default {
  init (el) {
    // For each link found on the page.
    $(el).find('a').each(function () {
      var $this = $(this)
      var linkAttr = $this.attr('href')

      if (typeof linkAttr !== typeof undefined && linkAttr !== '') {
        // Add tracking to outbound links.
        $this.attr('onClick', 'ga("send", "event", "Outbound Press Links", "Click: ' + linkAttr + '", "Referrer: ' + document.title + '")')
      }
    })
  },
  destroy () {}
}
