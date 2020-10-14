module.exports = {
  head: {
    title: '测试', //  title
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '拖拉拽' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
  },
  loading: { color: '#fff' }, //  页面进度条
  css: ['element-ui/lib/theme-chalk/index.css', 'assets/styles/reset.css'],
  plugins: [
    // ssr:true代表在服务端渲染,客户端不渲染
    { src: '~/plugins/element-ui', ssr: true },
    { src: '~/plugins/i18n.js', ssr: true },
    { src: '~/plugins/vue-draggable-resizable', ssr: true }
  ],
  build: {
    vendor: ['element-ui'], // 防止重复打包
    vendor: ['vue-i18n'] // webpack vue-i18n.bundle.js
  },
  generate: {
    routes: ['/', '/en-US']
  },
  router: {
    middleware: 'i18n'
  }
}
