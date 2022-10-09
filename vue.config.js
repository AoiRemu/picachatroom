module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/picachatroom' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            propList: ['*'],
            rootValue: 16,
          }),
        ],
      },
    },
  },
}
