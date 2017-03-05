import { combineReducers } from 'redux'
import ArticleReducer from './article'
import NewsReducer from './news'
const initState = {
  article: {
    data: {/*
      _id: {
        _id: "586b7b872384d311fd996905"
        createTime: "2017-01-03T10:23:03.437Z",
        description: "",
        tags: "",
        title: "gps",
        content: "",
        readed: false
      }
    */},
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
    isEnd: false
  },
  news: {
    data: {},
    isEnd: false,
    reading: -1,
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
  }
}
const reducers = {}
const AR = new ArticleReducer()
const NR = new NewsReducer()
reducers.articles = (state = initState.article, action) => {
  return AR[action.type] ? AR[action.type](state, action) : state
}
reducers.news = (state = initState.news, action) => {
  return NR[action.type] ? NR[action.type](state, action) : state
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
export default combineReducers(Object.assign({}, reducers))
