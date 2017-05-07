import API from 'src/api-config'
import { browserHistory } from 'react-router'


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

export const AAS = {
  ADD_ARTICLE: 'ADD_ARTICLE',
  ARTICLE_FILTER: 'ARTICLE_FILTER',
  REQUEST_STATE: 'ARTICLE_REQUEST_STATE',
  ARTICLE_SEARCH_STATE: 'ARTICLE_SEARCH_STATE',
  ARTICLE_FILTER_KEYWORD: 'ARTICLE_FILTER_KEYWORD',
  PULL_MORE: 'ARTICLE_PULL_MORE',
  READING: 'ARTICLE_READING',
  CONTENT_LOADED: 'ARTICLE_CONTENT_LOADED',
  DESTROY_BY_ID: 'ARTICLE_DESTROY_BY_ID'
}

export function destroyArticle (id) {
  return dispatch => {
    dispatch({
      type: 'ERROR',
      error: {
        message: '你正在进行删除操作,请确认',
        process: () => {
          dispatch({type: AAS.REQUEST_STATE, loading: true})
          API.Note.deleteById(id).then(() => {
            dispatch({type: AAS.DESTROY_BY_ID, id})
          }).catch((message) => dispatch({type: 'ERROR', error: {message}}))
          .then(() => dispatch({type: AAS.REQUEST_STATE, loading: false}))
        }
      }
    })
  }
}

export function setFecthArticlesFilter ({key, filter}) {
  return {type: AAS.ARTICLE_FILTER, key, filter}
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
    let article = getState().articles
    filter = filter || article.filter
    if (article.loading) {
      return hook()
    }
    dispatch({type: AAS.REQUEST_STATE, loading: true})
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
export function fetchArticleContent (id) {
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
export function fecthArticlesIfNeeded (filter) {
  return (dispatch) => {
    return dispatch(fetchArticles(filter))
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
    let state = getState().news
    filter = filter || state.filter
    if (state.loading) {
      return hook(filter)
    }
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
  CHANGE_EDITOR: 'EDITOR_CHANGE_EDITOR',
  REQUEST_STATE: 'EDITOR_REQUEST_STATE',
  CHANGE_CONTNET: 'EDITOR_CHANGE_CONTNET',
  CLEAR: 'EDITOR_CLEAR',
  FETCH_ARTICLE_FINISH: 'EDITOR_FETCH_ARTICLE_FINISH'
}
export function changeEditor (content) {
  return {type: EAS.CHANGE_EDITOR, content}
}
export function saveArticle () {
  return (dispatch, getState) => {
    let editor = getState().editor
    editor.createTime = editor.id ? editor.createTime : new Date()
    dispatch({type: EAS.REQUEST_STATE, loading: true})
    if (editor.loading) {
      return
    }
    let request = editor.id ?
      API.Note.updateById(editor.id, editor) : API.Note.create(editor)
    request
    .then(({data}) => {
      dispatch({type: EAS.FETCH_ARTICLE_FINISH, article: data})
      dispatch({type: EAS.REQUEST_STATE, loading: false})
    })
    .then(() => dispatch({
      type: 'ERROR', error: {message: '保存成功'}
    }))
    .catch(({message}) => {
      dispatch({type: 'ERROR', error: {message}})
      dispatch({type: EAS.REQUEST_STATE, loading: false})
    })
  }
}
export function clearEditor () {
  return {type: EAS.CLEAR}
}
export function editArticle (article) {
  return dispatch => {
    dispatch({type: EAS.CLEAR})
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
        browserHistory.push('/editor')
      })
  }
}

export const DAS = {
  SET_CONTENT: 'DEMO_SET_CONTENT',
  REQUEST_STATE: 'DEMO_REQUEST_STATE',
  FETCH_ARTICLE_FINISH: 'DEMO_FETCH_ARTICLE_FINISH'
}

export function setDemoContent (content) {
  return {type: DAS.SET_CONTENT, content}
}


export function saveDemo () {
  return (dispatch, getState) => {
    let demo = getState().demo
    dispatch(setDemoContent({loading: true}))
    if (demo.loading) {
      return
    }
    demo.createTime = demo.id ? demo.createTime : new Date()
    let request = demo.id ? API.Demo.updateById(demo.id, demo) : API.Demo.create(demo)
    request.then(({data}) => {
      dispatch({type: DAS.REQUEST_STATE, loading: false})
      dispatch({type: DAS.FETCH_ARTICLE_FINISH, demo: data})
      dispatch({type: 'ERROR', error: {message: '保存成功'}})
    }).catch(({message}) => dispatch({type: 'ERROR', error: {message}}))
    .then(() => dispatch({type: DAS.REQUEST_STATE, loading: false}))
  }
}
