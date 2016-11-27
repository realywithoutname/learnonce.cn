<template lang="html">
  <div class="scroller">
    <slot name="header"></slot>
    <slot name="scroller-body"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
let lastTop = 0
const sT = 1024
const mT = 1280
export default {
  data: function () {
    return {
      columns: [[], [], []],
      media: undefined,
      rePull: false
    }
  },
  /**
   * 现在只支持1,2,3
   */
  props: {
    lCol: {
      type: Number,
      default: 3
    },
    mCol: {
      type: Number,
      default: 2
    },
    sCol: {
      type: Number,
      default: 1
    },
    isTop: {
    }
  },
  computed: {},
  ready: function () {
    this.scrollListener()
    this.resize()
    window.addEventListener('resize', window.throttle(this.resize))
  },
  attached: function () {},
  methods: {
    getDebt () {
      // 列表高度
      let E1H = document.querySelector('.col-0-List').offsetHeight
      let E2H = document.querySelector('.col-1-List').offsetHeight
      let E3H = document.querySelector('.col-2-List').offsetHeight
      // 列表下card数量
      let cn1 = document.querySelectorAll('.col-0-List .card').length
      let cn2 = document.querySelectorAll('.col-1-List .card').length
      let cn3 = document.querySelectorAll('.col-2-List .card').length
      // 卡片平均高度
      let eH = (E1H + E2H + E3H) / (cn1 + cn2 + cn3)
      // 可获得信息条数基数
      let c1 = 0
      let c2 = 0
      let c3 = 0
      // 计算差距
      let s1to2 = Math.round((E1H - E2H) / eH)
      let s1to3 = Math.round((E1H - E3H) / eH)
      let s2to3 = Math.round((E2H - E3H) / eH)
      // 列表1比列表2高，平均高出{{s1to2}}个card，所以先补齐列表2，其他判断同理
      if (s1to2 > 0) {
        c2 += s1to2
      } else {
        c1 += -s1to2
      }
      if (s1to3 > 0) {
        c3 += s1to3
      } else {
        c1 += -s1to3
      }
      if (s2to3 > 0) {
        c3 += s2to3
      } else {
        c2 += -s2to3
      }
      return {c1, c2, c3}
    },
    loadView (data) {
      // 第一次
      let len = data.length
      if (this.columns[0].length === 0) {
        let x2 = Math.floor(len / 2)
        let x3 = Math.floor(len / 3)
        switch (this.media) {
          case 's':
            this.columns[0].push(...data)
            this.columns[1] = []
            this.columns[2] = []
            break
          case 'm':
            this.columns[0].push(...data.slice(0, x2))
            this.columns[1].push(...data.slice(x2))
            break
          case 'l':
            this.columns[0].push(...data.slice(0, x3))
            this.columns[1].push(...data.slice(x3, x3 * 2))
            this.columns[2].push(...data.slice(x3 * 2))
        }
        this.columns = [...this.columns]
        return
      }
      let rest
      let cg
      let {c1, c2, c3} = this.getDebt()
      switch (this.media) {
        case 's':
          this.columns[0].push(...data)
          break
        case 'm':
          // 计算剩余信息条数
          rest = len - (c1 + c2)
          // 平均能得到信息条数
          cg = Math.floor(rest / 2)
          this.columns[0].push(...data.slice(0, c1 + cg))
          this.columns[1].push(...data.slice(c1 + cg))
          break
        case 'l':
          // 计算剩余信息条数
          rest = len - (c1 + c2 + c3)
          // 平均能得到信息条数
          cg = Math.floor(rest / 3)
          let r = rest % 3
          r === 1 ? c2++ : (r === 2 ? c3++ : c1 += r)
          c1 += cg
          c2 += c1 + cg
          this.columns[0].push(...data.slice(0, c1))
          this.columns[1].push(...data.slice(c1, c2))
          this.columns[2].push(...data.slice(c2))
      }
      this.columns = [...this.columns]
    },
    resetView2s () {
      // 小屏幕下，保留第一列，其他列数据放到第一列
      this.columns[0].push(...this.columns[1], ...this.columns[2])
      this.columns[1] = []
      this.columns[2] = []
    },
    resetView2m (fromMedia) {
      // 中等屏幕，保留两列
      let {c1, c2, c3} = this.getDebt()
      // 小屏幕转中等屏幕, 偶数放到第二列
      if (fromMedia === 's') {
        this.columns[0].forEach((it, i) => {
          if (i % 2 !== 0) {
            this.columns[1].push(it)
            this.columns[0].splice(i, 1)
          }
        })
      } else {
        let col3 = this.columns[2]
        let rest = c3 - (c1 + c2)
        let cg = Math.floor(rest / 2)
        this.columns[0].push(...col3.slice(0, c1 + cg))
        this.columns[1].push(...col3.slice(c1 + cg))
        this.columns[2] = []
      }
      this.columns = [...this.columns]
    },
    resetView2l (fromMedia) {
      if (fromMedia === 'm') {
        this.columns[0].push(...this.columns[1])
      }
      this.columns[1] = []
      this.columns[2] = []
      this.columns[0].forEach((it, i) => {
        if (i % 3 === 1) {
          this.columns[1].push(it)
          this.columns[0].splice(i, 1)
        } else if (i % 3 === 2) {
          this.columns[2].push(it)
          this.columns[0].splice(i, 1)
        }
      })
      this.columns = [...this.columns]
    },
    scrollListener () {
      document.addEventListener('scroll', window.throttle(this.scroll))
    },
    scroll () {
      let top = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      let scrollHight = document.documentElement.scrollHeight || document.body.scrollHeight
      let winHight = window.innerHeight
      // 拉取新数据
      if (scrollHight - top - winHight < 500 && top - lastTop > 0) {
        this.pull()
      }
      // 判断滚动方向
      if (top - lastTop > 0) {
        this.$dispatch('scroll:bottom', top)
      } else if (top - lastTop < 0) {
        this.$dispatch('scroll:top', top)
      }
      lastTop = top
    },
    pull () {
      if (!this.rePull) {
        console.log(1, this.rePull)
        this.rePull = true
        this.$emit('pull:start')
      }
    },
    toTop () {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.pageYOffset = 0
      lastTop = 0
      this.$dispatch('scroll:top', 0)
      this.columns = [[], [], []]
      this.$emit('pull:start')
    },
    resize () {
      let ww = window.innerWidth
      if (ww <= sT) {
        this.media = 's'
      } else if (ww > mT) {
        this.media = 's'
      } else {
        this.media = 's'
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scroll)
    lastTop = 0
    this.rePull = false
  },
  components: {},
  events: {
    'data:push' (data) {
      this.loadView(data)
      this.rePull = false
      this.scrollListener()
    },
    'data:empty' () {
      this.columns = [[], [], []]
    }
  },
  watch: {
    media (media, fromMedia) {
      switch (media) {
        case 's':
          this.resetView2s(fromMedia)
          break
        case 'm':
          this.resetView2m(fromMedia)
          break
        case 'l':
          this.resetView2l(fromMedia)
          break
      }
    },
    'isTop' (is) {
      if (is) {
        this.toTop()
        this.isTop = false
      }
    }
  }
}
</script>

<style lang="css" scoped>
.to-top {
  position: fixed;
  bottom: 2rem;
  right: 1rem;
}
.to-top i {
  font-size: 1.5rem;
  width: 1.5rem;
  height: 1.5rem;
}
</style>
