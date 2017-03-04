import { combineReducers } from 'redux'
import { AAS } from './actions'
let reducers = {}
let filter = {
  limit: 20,
  offset: 0,
  fields: ['id', 'title', 'createTime', 'description', 'tags'],
  sort: {createTime: 'desc'},
  where: {$like: {}}
}
function setArticles (OAS, NAS) {
  NAS = Array.isArray(NAS) ? NAS : [NAS]
  return NAS.reduce((articles, acticle) => {
    articles[acticle._id] = acticle
    return articles
  }, OAS)
}
const initArticle = {data: {}, filter, searching: false, reading: -1}
reducers.articles = (state = initArticle, action) => {
  switch (action.type) {
    case AAS.TOGGLE_ARTICLE:
      return Object.assign({}, state, {reading: action.id})
    case AAS.ADD_ARTICLE:
      return Object.assign({}, state, {
        data: setArticles(state.data, action.article)
      })
    case AAS.REQUEST_START:
      return Object.assign({}, state, {loading: true})
    case AAS.REQUEST_END:
      return Object.assign({}, state, {loading: false})
    case AAS.ARTICLE_SEARCH_START:
      return Object.assign({}, state, {searching: true})
    case AAS.ARTICLE_SEARCH_END:
      return Object.assign({}, state, {searching: false})
    case AAS.ARTICLE_FILTER_KEYWORD:
      let filter = Object.assign({}, state.filter)
      filter.lastTitle = state.filter.where.$like.title
      filter.where.$like = {title: action.keyword}
      return Object.assign({}, state, {filter})
    case AAS.READING:
      let data = state.data
      if (action.id !== -1) {
        data[action.id].readed = true
      }
      return Object.assign({}, state, {reading: action.id, data})
    default:
      return state
  }
}
reducers.isApp = function (state = false, action) {
  return action.type === 'IS-APP' ? true : state
}
reducers.scroll = function (state = {}, action) {
  return action.type === 'SCROLLING' ? Object.assign({}, action.info) : state
}
export default combineReducers(Object.assign({}, reducers))
