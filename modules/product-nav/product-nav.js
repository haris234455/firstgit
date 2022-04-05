import 'jquery-visible'

export default {
  init (el) {
    var purchase = $(el).parents('body').find('.product-purchase')
    var addCart = purchase.find('.product-cart__btn')
    var buttonProductNav = $(el).find('.js-product-nav-button')
    var buttonSubmitForm = $(el).parents('body').find('.js-add-to-cart')

    // When the button add cart is not visible anymore, display product navigation.
    $(window).on('scroll', function () {
      (addCart.visible(true)) ? $(el).removeClass('product-nav--active') : $(el).addClass('product-nav--active')
    })

    if (buttonProductNav && buttonSubmitForm) {
      buttonProductNav.on('click', function () {
        buttonSubmitForm.trigger('click')
      })
    }
  },
  destroy () {}
}
