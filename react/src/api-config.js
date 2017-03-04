import axios from 'axios'

const createInstance = (config) => {
  return axios(Object.assign({}, {timeout: 1000}, config))
}

let API = {}
API.News = {}
API.News.find = filter => createInstance({method: 'GET', url: '/api/news', filter})
API.News.findById = id => createInstance({method: 'GET', url: `/api/news/${id}`})
API.News.updateById = id => createInstance({method: 'PUT', url: `/api/news/${id}`})

API.Note = {}
API.Note.create = data => createInstance({method: 'POST', url: '/api/notes', data})
API.Note.find = filter => createInstance({method: 'GET', url: '/api/notes', params: {filter}})
API.Note.findById = id => createInstance({method: 'GET', url: `/api/notes/${id}`})
API.Note.updateById = id => createInstance({method: 'PUT', url: `/api/notes/${id}`})
API.Note.deleteById = id => createInstance({method: 'DELETE', url: `/api/notes/${id}`})

API.Feed = {}
API.Feed.find = filter => createInstance({method: 'GET', url: '/api/feeds', params: {filter}})

API.Tag = {}
API.Tag.find = filter => createInstance({method: 'GET', url: '/api/tags', params: {filter}})

export default API
