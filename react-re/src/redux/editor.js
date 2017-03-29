import {EAS} from './actions'
export default class EditorReducer {
  [EAS.CHANGE_EDITOR] (state, action) {
    return Object.assign({}, state, action.content)
  }
  [EAS.REQUEST_STATE] (state, action) {
    return Object.assign({}, state, {loading: action.loading})
  }
  [EAS.FETCH_ARTICLE_FINISH] (state, action) {
    let {
      _id: id, content, description, tags, title, createTime, translated
    } = action.article
    return Object.assign(
      {}, state, {id, content, description, tags, title, createTime, translated}
    )
  }
  [EAS.CLEAR] (state) {
    return Object.assign({}, state, {
      id: '',
      title: '',
      content: '',
      tags: '',
      description: '',
      loading: false
    })
  }
}
