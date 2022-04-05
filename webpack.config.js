const path = require('path')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    'holidays': [
      './src/assets/css/holidays.css'
    ],
    'main': [
      './src/assets/css/main.css',
      './src/assets/js/main'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: '[name].js',
    chunkFilename: `[name]-[id].js?version=${Date.now()}`
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.s?css$/,
        extract: true,
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'lib': path.resolve(__dirname, 'src/assets/js/lib'),
      'modules': path.resolve(__dirname, 'src/modules'),
      'root': path.resolve(__dirname, 'src'),
      'vue': process.env.ENV === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
      'vendors': path.resolve(__dirname, 'src/assets/js/vendors'),
      'TweenLite': path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      'TweenMax': path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      'TimelineLite': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      'TimelineMax': path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      'ScrollMagic': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
    }
  }
}
