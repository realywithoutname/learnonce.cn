let config = [{
  name: 'index',
  route: '/',
  component: 'index'
}, {
  name: 'news',
  route: '/news',
  component: 'news'
}, {
  name: 'news detail',
  route: '/news/:id',
  component: 'news-detail'
}, {
  name: 'notes',
  route: '/notes',
  component: 'note'
}, {
  name: 'note editor',
  route: '/notes/:id',
  component: 'note-editor'
}]
let route = (() => {
  let routes = {}
  for (let key of config) {
    routes[key.route] = {
      component (resolve) {
        require(['./pages/' + key.component], resolve)
      },
      name: key.name
    }
  }
  return routes
})()
export default route
