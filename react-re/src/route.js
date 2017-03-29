function blog () {
  this.path = 'blog'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/blog').default)
    })
  }
}
function article () {
  this.path = '/**/article/:id'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/article').default)
    })
  }
}
function translate () {
  this.path = '/translate'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/translate').default)
    })
  }
}
function news () {
  this.path = 'news'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/news').default)
    })
  }
}
function me () {
  this.path = 'me'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/me').default)
    })
  }
}
function editor () {
  this.path = 'editor'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/editor').default)
    })
  }
}
function ide () {
  this.path = 'ide'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/ide').default)
    })
  }
}

function root () {
  this.path = '/'
  this.component = require('pages/index').default
}
const createRoute = (R) => {
  let route = new R()
  route.childRoutes = route.childRoutes && route.childRoutes.map(r => createRoute(r))
  return route
}

export default [
  root, me, news, blog, editor, ide, article, translate
].map((route) => createRoute(route))
