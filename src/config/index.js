export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'vlink-admin',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://situxu.com/',
    pro: '/'
  },

  // baseImgUrl: 'http://timon-qiniu.landman.cn/%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202019-01-03%20%E4%B8%8B%E5%8D%8811.32.05.png',
  baseImgUrl: 'http://timon-qiniu.landman.cn/',

  tokenUrl: {
    // dev: 'http://localhost:3000/token',
    dev: 'http://situxu.com/qiniu/token',
    pro: '/qiniu/token'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'resize-window': {
      timeout: 50 // 屏幕大小变化后延时处理时间
    }
  }
}
