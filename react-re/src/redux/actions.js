import API from 'src/api-config'
import { hashHistory } from 'react-router'

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

export function auth (finger) {
  return dispatch => {
    API.setFinger(finger)
    API.auth().then(() => dispatch({type: 'AUTH_PASS'}))
      .catch(() => dispatch({type: 'ERROR', error: {}}))
  }
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
      .then(() => dispatch({
        type: AAS.REQUEST_STATE, loading: false
      }))
      .catch(({message}) => dispatch({
        type: 'ERROR', error: {message}
      }))
      .then(() => hook())
  }
}
function fetchArticleContent (id) {
  return dispatch => {
    dispatch({type: AAS.REQUEST_STATE, loading: true})
    API.Note.findById(id)
      .then(({data}) => dispatch(addArticle(data)))
      .then(() => dispatch({
        type: AAS.REQUEST_STATE, loading: false
      }))
      .catch(({message}) => dispatch({
        type: 'ERROR', error: {message}
      }))
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
  return (dispatch) => {
    dispatch(lockScroll(true))
    dispatch({type: AAS.PULL_MORE})
    dispatch(fetchArticles(null, () => dispatch(lockScroll(false))))
  }
}
export function fecthArticlesIfNeeded () {
  return (dispatch) => {
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
      .catch(({message}) => dispatch({
        type: 'ERROR', error: {message}
      }))
      .then(() => dispatch({
        type: NAS.REQUEST_STATE, loading: false
      }))
      .then(() => hook(filter))
  }
}

export function fetchMoreNews () {
  return (dispatch) => {
    dispatch(lockScroll(true))
    dispatch({type: NAS.PULL_MORE})
    dispatch(fetchNews(null, () => dispatch(lockScroll(false))))
  }
}

export function newsReading (id = -1) {
  return (dispatch, getState) => {
    dispatch({type: NAS.READING, id})
    let news = getState().news.data[id]
    if (id !== -1 && !news.fulled) {
      dispatch({type: NAS.REQUEST_STATE, loading: true})
      API.News.findById(id)
      .then(({data}) => dispatch(addNews(data)))
      .then(() => dispatch({type: NAS.CONTENT_LOADED, id}))
      .then(() => dispatch({
        type: NAS.REQUEST_STATE, loading: false
      }))
      .catch(({message}) => dispatch({
        type: 'ERROR', error: {message}
      }))
    }
  }
}
export function fecthNewsIfNeeded () {
  return (dispatch) => {
    return dispatch(fetchNews())
  }
}
export const EAS = {
  CHANGE_TITLE: 'EDITOR_CHANGE_TITLE',
  CHANGE_TAGS: 'EDITOR_CHANGE_TAGS',
  CHANGE_DESCRIPTION: 'EDITOR_CHANGE_DESCRIPTION',
  REQUEST_STATE: 'EDITOR_REQUEST_STATE',
  CHANGE_CONTNET: 'EDITOR_CHANGE_CONTNET',
  SAVE_STATE: 'EDITOR_SAVE_STATE',
  FETCH_ARTICLE_FINISH: 'EDITOR_FETCH_ARTICLE_FINISH'
}
export function changeTitle (title) {
  return {type: EAS.CHANGE_TITLE, title}
}
export function changeContent (content) {
  return {type: EAS.CHANGE_CONTNET, content}
}
export function changeTags (tags) {
  return {type: EAS.CHANGE_TAGS, tags}
}
export function changeDescription (description) {
  return {type: EAS.CHANGE_DESCRIPTION, description}
}
export function saveArticle () {
  return (dispatch, getState) => {
    let editor = getState().editor
    let request = editor.id ?
      API.Note.updateById(editor.id, editor) : API.Note.create(editor)
    dispatch({type: EAS.REQUEST_STATE, loading: true})
    request.catch(({message}) => dispatch({
      type: 'ERROR', error: {message}
    }))
    .then(() => dispatch({
      type: EAS.REQUEST_STATE, loading: false
    }))
    .then(() => dispatch({
      type: 'ERROR', error: {message: '保存成功'}
    }))
  }
}
export function editArticle (article) {
  return dispatch => {
    dispatch({type: EAS.REQUEST_STATE, loading: true})
    API.Note.findById(article._id)
      .then(({data}) => dispatch({
        type: EAS.FETCH_ARTICLE_FINISH, article: data
      }))
      .catch(({message}) => dispatch({
        type: 'ERROR', error: {message}
      }))
      .then(() => {
        dispatch({
          type: EAS.REQUEST_STATE, loading: false
        })
        hashHistory.push('/editor')
      })
  }
}
