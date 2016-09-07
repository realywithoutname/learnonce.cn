let API = {}
let baseUrl = '/api'
API.News = {
  find: {
    method: 'GET',
    url: '/api/news'
  },
  findById: {
    method: 'GET',
    url: '/api/news{/id}'
  }
}
API.Note = {
  create: {
    method: 'POST',
    url: '/api/notes'
  },
  find: {
    method: 'GET',
    url: '/api/notes'
  },
  findById: {
    method: 'GET',
    url: '/api/notes{/id}'
  },
  updateById: {
    method: 'PUT',
    url: '/api/notes{/id}'
  }
}
let install = (vue) => {
  for (let key in API) {
    if (API.hasOwnProperty(key)) {
      vue.prototype[key] = vue.resource(baseUrl, {}, API[key])
    }
  }
}
export default {install}
