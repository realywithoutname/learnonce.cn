import API from 'src/api-config'
export const AAS = {
  ADD_ARTICLE: 'ADD_ARTICLE',
  REQUEST_STATE: 'ARTICLE_REQUEST_STATE',
  ARTICLE_SEARCH_STATE: 'ARTICLE_SEARCH_STATE',
  ARTICLE_FILTER_KEYWORD: 'ARTICLE_FILTER_KEYWORD',
  PULL_MORE: 'ARTICLE_PULL_MORE',
  READING: 'ARTICLE_READING',
  CONTENT_LOADED: 'ARTICLE_CONTENT_LOADED'
}
export function isApp () {
  return {type: 'IS-APP'}
}

export function scrolling (info) {
  return {type: 'SCROLLING', info}
}

export function lockScroll (lock) {
  return {type: 'LOCK_SCROLL', lock}
}

export function articleSearchStart () {
  return {type: AAS.ARTICLE_SEARCH_STATE, searching: true}
}

export function articleSearchEnd () {
  return {type: AAS.ARTICLE_SEARCH_STATE, searching: false}
}

function addArticle (article) {
  return {type: AAS.ADD_ARTICLE, article}
}

function fetchArticles (filter, hook = () => {}) {
  return (dispatch, getState) => {
    dispatch({type: AAS.REQUEST_STATE, loading: true})
    filter = filter || getState().articles.filter
    API.Note.find(filter)
      .then(res => res.data)
      .then(data => dispatch(addArticle(data)))
      .then(() => dispatch({type: AAS.REQUEST_STATE, loading: false}))
      .then(() => hook())
  }
}
function fetchArticleContent (id) {
  return dispatch => {
    dispatch({type: AAS.REQUEST_STATE, loading: true})
    API.Note.findById(id)
      .then(({data}) => dispatch(addArticle(data)))
      .then(() => dispatch({type: AAS.REQUEST_STATE, loading: false}))
      .then(() => dispatch({type: AAS.CONTENT_LOADED, id}))
  }
}
export function articleReading (id = -1) {
  return (dispatch, getState) => {
    dispatch({type: AAS.READING, id})
    if (id !== -1) {
      let article = getState().articles.data[id]
      !article.fulled && dispatch(fetchArticleContent(id))
    }
  }
}
export function filterArticlesWithKeyword (keyword) {
  return (dispatch, getState) => {
    dispatch({type: AAS.ARTICLE_FILTER_KEYWORD, keyword})
    let filter = getState().articles.filter
    let lastTitle = filter.lastTitle
    !(keyword && new RegExp(keyword).test(lastTitle)) && dispatch(fetchArticles({where: {$like: {title: keyword}}}))
  }
}
export function fetchMoreArticle () {
  return (dispatch, getState) => {
    dispatch(lockScroll(true))
    dispatch({type: AAS.PULL_MORE})
    dispatch(fetchArticles(null, () => dispatch(lockScroll(false))))
  }
}
export function fecthArticlesIfNeeded () {
  return (dispatch, getState) => {
    return dispatch(fetchArticles())
  }
}

export const NAS = {
  ADD_NEWS: 'ADD_NEWS',
  REQUEST_STATE: 'NEWS_REQUEST_STATE',
  PULL_MORE: 'NEWS_PULL_MORE',
  READING: 'NEWS_READING',
  CONTENT_LOADED: 'NEWS_CONTENT_LOADED'
}

function addNews (news) {
  return {type: NAS.ADD_NEWS, news}
}

function fetchNews (filter, hook = () => {}) {
  return (dispatch, getState) => {
    let state = getState()
    filter = filter || state.news.filter
    dispatch({type: NAS.REQUEST_STATE, loading: true})
    API.News.find(filter)
      .then(({data}) => dispatch(addNews(data)))
      .then(() => dispatch({type: NAS.REQUEST_STATE, loading: false}))
      .then(() => hook(filter))
  }
}

export function fetchMoreNews () {
  return (dispatch, getState) => {
    dispatch(lockScroll(true))
    dispatch({type: NAS.PULL_MORE})
    dispatch(fetchNews(null, () => dispatch(lockScroll(false))))
  }
}

export function newsReading (id = -1) {
  return (dispatch, getState) => {
    dispatch({type: NAS.READING, id})
    if (id !== -1) {
      let news = getState().news.data[id]
      !news.fulled && API.News.findById(id)
      .then(({data}) => dispatch(addNews(data)))
      .then(() => dispatch({type: NAS.CONTENT_LOADED, id}))
    }
  }
}
export function fecthNewsIfNeeded () {
  return (dispatch, getState) => {
    return dispatch(fetchNews())
  }
}
