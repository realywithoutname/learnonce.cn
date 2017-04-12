import {NAS} from './actions'
export default class NewsReducer {
  setNews (newNews, oldNews) {
    newNews = Array.isArray(newNews) ? newNews : [newNews]
    return newNews.reduce((result, news) => {
      if (result[news._id]) {
        news.description = result[news._id].description
      }
      result[news._id] = news
      return result
    }, oldNews)
  }
  [NAS.ADD_NEWS] (state, action) {
    return Object.assign({}, state, {data: this.setNews(action.news, state.data)})
  }
  [NAS.REQUEST_STATE] (state, action) {
    return Object.assign({}, state, {loading: action.loading})
  }
  [NAS.PULL_MORE] (state) {
    let filter = Object.assign({}, state.filter)
    filter.offset += filter.limit
    return Object.assign({}, state, {filter})
  }
  [NAS.READING] (state, action) {
    return Object.assign({}, state, {reading: action.id})
  }
  [NAS.CONTENT_LOADED] (state, action) {
    let data = state.data
    data[action.id].fulled = true
    return Object.assign({}, state, {data})
  }
}
