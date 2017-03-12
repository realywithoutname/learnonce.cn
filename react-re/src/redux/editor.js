import {EAS} from './actions'
export default class EditorReducer {
  [EAS.CHANGE_TITLE] (state, action) {
    return Object.assign({}, state, {title: action.title})
  }
  [EAS.CHANGE_CONTNET] (state, action) {
    return Object.assign({}, state, {content: action.content})
  }
  [EAS.CHANGE_TAGS] (state, action) {
    return Object.assign({}, state, {tags: action.tags})
  }
  [EAS.CHANGE_DESCRIPTION] (state, action) {
    return Object.assign({}, state, {description: action.description})
  }
  [EAS.REQUEST_STATE] (state, action) {
    return Object.assign({}, state, {loading: action.loading})
  }
  [EAS.SAVE_STATE] (state, action) {
    return Object.assign({}, state, {success: action.success})
  }
  [EAS.FETCH_ARTICLE_FINISH] (state, action) {
    let {
      _id: id, content, description, tags, title
    } = action.article
    return Object.assign(
      {}, state, {id, content, description, tags, title}
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
