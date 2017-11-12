function blog() {
  this.path = 'blog'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/blog').default)
    })
  }
}
function resume() {
  this.path = 'resume'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/resume').default)
    })
  }
}

function article() {
  this.path = '/blog/:id'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/blog/article').default)
    })
  }
}

function articleCreate() {
  this.path = '/article(/:id)'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/blog/edit').default)
    })
  }
}
function demos() {
  this.path = '/demos'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/demo').default)
    })
  }
}
function news() {
  this.path = 'news'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/news/index').default)
    })
  }
}
function me() {
  this.path = 'about'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/me').default)
    })
  }
}
// function editor () {
//   this.path = 'editor'
//   this.getComponent = (nextstate, cb) => {
//     require.ensure([], (require) => {
//       cb(null, require('pages/editor').default)
//     })
//   }
// }
function ide() {
  this.path = '/IDE(/:id)'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/IDE').default)
    })
  }
}

function demo() {
  this.path = '/demos(/:id)'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/IDE').default)
    })
  }
}

// function root () {
//   this.path = '/'
//   this.component = require('pages/index').default
// }

function home() {
  this.path = '/'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], require => {
      cb(null, require('pages/home/index').default)
    })
  }
  this.getIndexRoute = (nextstate, cb) => {
    require.ensure([], require => {
      cb(null, { component: require('pages/news/index').default })
    })
  }
  this.childrens = [news, blog, demos]
}
const createRoute = (R) => {
  let route = new R()
  route.getChildRoutes = (nextstate, cb) => {
    let childrens = route.childrens ? route.childrens.map(r => createRoute(r)) : []
    require.ensure([], () => cb(null, childrens))
  }
  return route
}
export default [
  home, articleCreate, ide, demo, article, me, resume
].map((route) => createRoute(route))
// export default createRoute(home)
