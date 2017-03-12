import { AAS } from './actions'

export default class ArticleReducer {
  [AAS.ADD_ARTICLE] (state, action) {
    return Object.assign({}, state, {
      data: this.setArticles(state.data, action.article),
      isEnd: Array.isArray(action.article) && action.article.length === 0
    })
  }
  setArticles (oldArticles, newArticles) {
    newArticles = Array.isArray(newArticles) ? newArticles : [newArticles]
    return newArticles.reduce((articles, acticle) => {
      articles[acticle._id] = acticle
      return articles
    }, oldArticles)
  }
  [AAS.ARTICLE_REQUEST_STATE] (state, action) {
    return Object.assign({}, state, {loading: action.loading})
  }
  [AAS.ARTICLE_SEARCH_STATE] (state, action) {
    return Object.assign({}, state, {searching: action.searching})
  }
  [AAS.ARTICLE_FILTER_KEYWORD] (state, action) {
    let filter = Object.assign({}, state.filter)
    filter.lastTitle = state.filter.where.$like.title
    filter.where.$like = {title: action.keyword}
    return Object.assign({}, state, {filter})
  }
  [AAS.PULL_MORE] (state) {
    let filter = Object.assign({}, state.filter)
    filter.offset += filter.limit
    return Object.assign({}, state, {filter})
  }
  [AAS.CONTENT_LOADED] (state, action) {
    let data = state.data
    data[action.id].fulled = true
    return Object.assign({}, state, {data})
  }
  [AAS.READING] (state, action) {
    return Object.assign({}, state, {reading: action.id})
  }
}
