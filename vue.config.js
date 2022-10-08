module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/picachatroom' : '/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 192,
            exclude: /node_modules\/vant|mobile/i, // 排除mobile和vant库
            propList: ['*'],
            selectorBlackList: ['.van-'], // 排除移动端使用了vant库
          }),
          require('postcss-pxtorem')({
            rootValue: 37.5,
            exclude: 'pc', // 排除pc
            propList: ['*'],
          }),
        ],
      },
    },
  },
}
