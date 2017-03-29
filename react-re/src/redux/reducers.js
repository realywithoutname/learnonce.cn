import { combineReducers } from 'redux'
import ArticleReducer from './article'
import NewsReducer from './news'
import EditorReducer from './editor'
import DemoReducer from './demo'
const initState = {
  article: {
    data: {},
    filter: {
      limit: 10,
      offset: 0,
      fields: [
        'id',
        'title',
        'createTime',
        'description',
        'tags'
      ],
      sort: {createTime: 'desc'},
      where: {$like: {}}
    },
    searching: false,
    reading: -1,
    isEnd: false,
    loading: false
  },
  news: {
    data: {},
    isEnd: false,
    reading: -1,
    loading: false,
    filter: {
      where: {},
      limit: 20,
      offset: 0,
      fields: [
        'id',
        'title',
        'star',
        'content',
        'from',
        'link',
        'pubTime',
        'image'
      ],
      sort: {createTime: 'desc'}
    }
  },
  scroll: {
    height: 0,
    curTop: 0,
    direction: false,
    lock: false,
    scrollHeight: 0
  },
  editor: {
    id: '',
    title: '',
    content: '',
    tags: '',
    description: '',
    loading: false,
    translated: false
  },
  demo: {
    id: '',
    css: '',
    html: '',
    script: ''
  }
}
const reducers = {}
const AR = new ArticleReducer()
const NR = new NewsReducer()
const ER = new EditorReducer()
const DR = new DemoReducer()
reducers.articles = (state = initState.article, action) => {
  return AR[action.type] ? AR[action.type](state, action) : state
}
reducers.editor = (state = initState.editor, action) => {
  return ER[action.type] ? ER[action.type](state, action) : state
}
reducers.news = (state = initState.news, action) => {
  return NR[action.type] ? NR[action.type](state, action) : state
}
reducers.demo = (state = initState.demo, action) => {
  return DR[action.type] ? DR[action.type](state, action) : state
}
reducers.isApp = function (state = false, action) {
  return action.type === 'IS-APP' ? true : state
}
reducers.scroll = function (state = initState.scroll, action) {
  switch (action.type) {
    case 'SCROLLING':
      return Object.assign({}, {...action.info, lock: state.lock})
    case 'LOCK_SCROLL':
      return Object.assign({}, state, {lock: action.lock})
    default:
      return state
  }
}
reducers.error = function (state = {}, action) {
  switch (action.type) {
    case 'ERROR':
      return Object.assign({}, action.error)
    case 'CLEAR_ERROR':
      return {}
    default:
      return state
  }
}
reducers.isAuth = function (state = false, action) {
  return action.type === 'AUTH_PASS' ? true : state
}
reducers.finger = function (state = '', action) {
  return action.type === 'FINGER' ? action.value : state
}
export default combineReducers(Object.assign({}, reducers))
