function blog () {
  this.path = 'blog'
  this.getComponent = (nextstate, cb) => {
    require.ensure([], (require) => {
      cb(null, require('pages/blog').default)
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
function root () {
  this.path = '/'
  this.component = require('pages/index').default
}
const createRoute = (R) => {
  let route = new R()
  if (route.childRoutes) {
    route.childRoutes = route.childRoutes.map((r) => {
      return createRoute(r)
    })
  }
  return route
}

export default [root, me, news, blog, editor].map((route) => createRoute(route))
