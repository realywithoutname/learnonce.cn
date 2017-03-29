import {DAS} from './actions'
export default class DemoReducer {
  [DAS.SET_CONTENT] (state, action) {
    return Object.assign({}, state, action.content)
  }
  [DAS.REQUEST_STATE] (state, action) {
    return Object.assign({}, state, {loading: action.loading})
  }
  [DAS.FETCH_ARTICLE_FINISH] (state, action) {
    let {_id: id, createTime, css, html, script} = action.demo
    return {id, createTime, css, html, script}
  }
}
