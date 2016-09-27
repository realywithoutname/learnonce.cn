import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import vHeader from 'components/Head'
import route from './route'
import './assets/style/base.css'
import './assets/style/style.css'
import './assets/script/util.js'
import resources from './resources'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(resources)
Vue.use({
  install (vue) {
    vue.prototype.html2text = function (string) {
      return string.replace(/<\/?.+?>/g, '')
    }
    vue.filter('date', function formatTime (date, mode) {
      date = new Date(date)
      if (date.toString() === 'Invalid Date') {
        return
      }
      let year = date.getFullYear()
      let month = ('0' + (date.getMonth() + 1)).substr(-2)
      let day = ('0' + date.getDate()).substr(-2)
      let hour = ('0' + date.getHours()).substr(-2)
      let minute = ('0' + date.getMinutes()).substr(-2)
      let second = ('0' + date.getSeconds()).substr(-2)
      return mode
        .replace('yyyy', year)
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('dd', day)
        .replace('hh', hour)
        .replace('HH', hour)
        .replace('mm', minute)
        .replace('ss', second)
    })
  }
})
Vue.http.interceptors.push((req, next) => {
  if (req.params.filter) {
    req.params.filter = JSON.stringify(req.params.filter)
  }
  next()
})

let app = Vue.extend({
  components: {vHeader},
  data () {
    return {
      filterCtrl: false,
      sideCtrl: false,
      noting: false,
      list: false,
      noteCtrl: true,
      needList: false,
      needHead: true,
      keyword: '',
      menu: false
    }
  }
})
let router = new VueRouter({history: false})

router.map(route)
router.start(app, 'body')
