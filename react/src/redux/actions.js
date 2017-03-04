import API from 'src/api-config'
export const AAS = {
  TOGGLE_ARTICLE: 'TOGGLE_ARTICLE',
  ADD_ARTICLE: 'ADD_ARTICLE',
  REQUEST_START: 'REQUEST_START',
  REQUEST_END: 'REQUEST_END',
  ARTICLE_SEARCH_START: 'ARTICLE_SEARCH_START',
  ARTICLE_SEARCH_END: 'ARTICLE_SEARCH_END',
  ARTICLE_FILTER_KEYWORD: 'ARTICLE_FILTER_KEYWORD',
  READING: 'READING'
}
export function isApp () {
  return {type: 'IS-APP'}
};
export function scrolling (info) {
  return {type: 'SCROLLING', info}
}
export function toggleArticle (id) {
  return {type: AAS.TOGGLE_ARTICLE, id}
}
export function addArticle (article) {
  return {type: AAS.ADD_ARTICLE, article}
}
export function articleSearchStart () {
  return {type: AAS.ARTICLE_SEARCH_START}
}
export function articleSearchEnd () {
  return {type: AAS.ARTICLE_SEARCH_END}
}
export function articleReading (id = -1) {
  return {type: AAS.READING, id}
}
export function requestStart () {
  return {type: AAS.REQUEST_START}
}
export function requestEnd () {
  return {type: AAS.REQUEST_END}
}
export function fetchArticleContent (id) {
  return dispatch => {
    dispatch(articleReading(id))
    dispatch(requestStart())
    API.Note.findById(id)
      .then(({data}) => dispatch(addArticle(data)))
      .then(() => dispatch(requestEnd()))
  }
}
export function filterArticlesWithKeyword (keyword) {
  return dispatch => {
    dispatch({type: AAS.ARTICLE_FILTER_KEYWORD, keyword})
    dispatch(fetchArticles())
  }
}
function fetchArticles () {
  return (dispatch, getState) => {
    dispatch(requestStart())
    let state = getState()
    let filter = state.articles.filter
    let lastTitle = filter.lastTitle
    let title = filter.where.$like.title
    if (title && new RegExp(title).test(lastTitle)) {
      return
    }
    API.Note.find(filter)
      .then(res => res.data)
      .then(data => dispatch(addArticle(data)))
      .then(() => dispatch(requestEnd()))
  }
}
export function ifNeedPull () {
  return (dispatch, getState) => {
    let scroll = getState().scroll
    let toBottom = scroll.scrollHeight - scroll.height - scroll.curTop
    console.log(toBottom)
  }
}
export function fecthArticlesIfNeeded () {
  return (dispatch, getState) => {
    return dispatch(fetchArticles())
  }
}
