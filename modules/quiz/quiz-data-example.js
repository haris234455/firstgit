const quizData = {
  'questions': [
    {
      'key': 'name',
      'title': '',
      'text': 'Let’s begin, we want to get to know you better!',
      'type': 'input',
      'placeholder': 'Enter Your Name',
      'button_text': 'Next Question',
      'tip': ''
    },
    {
      'key': 'goal',
      'title': 'Step 1',
      'text': 'Hi [name]! What are your skincare goals?',
      'type': 'multiple-select',
      'options': [
        {'title': 'Even Skintone', 'value': 'even-skintone', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Oil Control', 'value': 'oil-control', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Hydration', 'value': 'hydration', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Brightness', 'value': 'brightness', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Anti-Aging', 'value': 'anti-aging', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Redness Reduction', 'value': 'redness-reduction', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Sun Protection', 'value': 'sun-protection', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'}
      ],
      'button_text': 'Next Question',
      'tip': 'TIP: We curate formulas that have been carefully crafted to help aleviate common skincare concerns.'
    },
    {
      'key': 'skin-type',
      'title': 'Step 2',
      'text': 'What is your skin type?',
      'type': 'single-select',
      'options': [
        {'title': 'Normal', 'value': 'normal', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Dry', 'value': 'dry', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Oily', 'value': 'oily', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Combination', 'value': 'combination', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'}
      ],
      'button_text': 'Next Question',
      'tip': 'TIP: If your skin is sometimes oily and sometimes dry, select combination.'
    },
    {
      'key': 'product-type',
      'title': 'Step 3',
      'text': 'What product type do you prefer?',
      'type': 'single-select',
      'options': [
        {'title': 'Cream', 'value': 'cream', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Gels/Serums', 'value': 'gels/serums', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'Masks', 'value': 'masks', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'},
        {'title': 'I\'m open', 'value': ' ', 'image_url': 'https://cdn.shopify.com/s/files/1/0049/8260/3876/files/icon-even-skintone.svg'}
      ],
      'button_text': 'Next Question',
      'tip': 'TIP: Gels and serums are often lighter weight than creams and are better for warmer environments.'
    },
    {
      'key': 'email',
      'title': 'Results',
      'text': 'Enter your email address so we can save your results',
      'type': 'input',
      'placeholder': 'Enter Your Email',
      'button_text': 'Submit + See Results',
      'tip': ''
    }
  ],
  'resultText': 'Thanks [name], here are the products curated for you!'
}
