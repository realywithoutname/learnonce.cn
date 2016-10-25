import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import {plug} from 'assets/script/vue-wheel'
import vHeader from 'components/Head'
import route from './route'
import './assets/style/base.css'
import './assets/style/style.css'
import './assets/script/util.js'
import Fingerprint from './assets/script/fingerprint.js'
import resources from './resources'
let fingerprint = new Fingerprint({canvas: true}).get()
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(plug)
Vue.use(resources)
Vue.http.interceptors.push((req, next) => {
  if (req.params.filter) {
    req.params.filter = JSON.stringify(req.params.filter)
  }
  if (req.method.toLowerCase() === 'post' || req.method.toLowerCase() === 'put') {
    let date = new Date().getTime()
    req.params.finger = (fingerprint + date).toString(32) + 'T' + date
  }
  next((res) => {
    if (res.status < 200 || res.status >= 400) {
      let v = new Vue({})
      v.$toast('请求错误', 'top')
    }
  })
})

let app = Vue.extend({
  components: {vHeader},
  data () {
    return {
      filterCtrl: false, // 过滤控制按钮
      menu: false,
      sideCtrl: false, // 侧边抽屉显示按钮
      noteCtrl: true, // 编辑按钮
      noting: false, // 编辑状态
      needHead: true, // header控制变量
      keyword: '',  // 搜索关键字
      level: false, // 用户权限
      key: fingerprint // 浏览器指纹
    }
  },
  ready () {
    this.auth()
  },
  methods: {
    auth () {
      this.$http.post('/api/auth', {})
        .then((res) => {
          this.level = Boolean(res.data)
        })
    }
  }
})
let router = new VueRouter({history: false})

router.map(route)
router.start(app, 'body')
