import axios from 'axios'
const baseCfg = {
  timeout: 5000,
  finger: null
}

const token = () => {
  let date = new Date().getTime()
  return (baseCfg.finger + date).toString(32) + 'T' + date
}

const createInstance = (config) => {
  return axios(Object.assign({}, baseCfg, config))
}

axios.interceptors.request.use((config) => {
  config.params = config.params || {}
  config.params.finger = token()
  return config
})
let API = {}

API.setFinger = (finger) => {
  baseCfg.finger = finger
}

API.auth = () => createInstance({method: 'POST', url: '/api/auth'})

API.News = {}
API.News.find = filter => createInstance({method: 'GET', url: '/api/news', params: {filter}})
API.News.findById = id => createInstance({method: 'GET', url: `/api/news/${id}`})
API.News.updateById = id => createInstance({method: 'PUT', url: `/api/news/${id}`})
API.News.deleteById = id => createInstance({method: 'DELETE', url: `/api/news/${id}`})

API.Note = {}
API.Note.create = data => createInstance({method: 'POST', url: '/api/notes', data})
API.Note.find = filter => createInstance({method: 'GET', url: '/api/notes', params: {filter}})
API.Note.findById = id => createInstance({method: 'GET', url: `/api/notes/${id}`})
API.Note.updateById = (id, data) => createInstance({method: 'PUT', url: `/api/notes/${id}`, data})
API.Note.deleteById = id => createInstance({method: 'DELETE', url: `/api/notes/${id}`})

API.Feed = {}
API.Feed.find = filter => createInstance({method: 'GET', url: '/api/feeds', params: {filter}})

API.Tag = {}
API.Tag.find = filter => createInstance({method: 'GET', url: '/api/tags', params: {filter}})

API.Demo = {}
API.Demo.create = data => createInstance({method: 'POST', url: '/api/demos', data})
API.Demo.find = filter => createInstance({method: 'GET', url: '/api/demos', params: {filter}})
API.Demo.findById = id => createInstance({method: 'GET', url: `/api/demos/${id}`})
API.Demo.updateById = (id, data) => createInstance({method: 'PUT', url: `/api/demos/${id}`, data})
API.Demo.deleteById = id => createInstance({method: 'DELETE', url: `/api/demos/${id}`})
export default API
