let config = [{
  name: 'index',
  route: '/',
  component: 'index'
}, {
  name: 'news',
  route: '/news',
  component: 'news'
}, {
  name: 'notes',
  route: '/note',
  component: 'note'
}, {
  name: 'note create',
  route: '/note/create',
  component: 'note-editor'
}, {
  name: 'note editor',
  route: '/note/:id/editor',
  component: 'note-editor'
}, {
  name: 'note detail',
  route: '/note/:id',
  component: 'note-detail'
}]
let route = (() => {
  let routes = {}
  for (let key of config) {
    routes[key.route] = {
      component: require('./pages/' + key.component),
      name: key.name
    }
  }
  return routes
})()
export default route
