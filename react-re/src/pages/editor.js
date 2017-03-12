import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as style from 'styles/edit.css'
import EditorContainer from 'components/Editor'
import Previewer from 'components/Previewer'
import {
  changeTitle,
  changeContent,
  changeTags,
  changeDescription,
  saveArticle
} from 'src/redux/actions'
class Editor extends Component {
  render () {
    let {editor, dispatch} = this.props
    return (
      <div className={style.page}>
        <EditorContainer
        article={editor}
        contentChange={(e) => {
          dispatch(changeContent(e.target.value))
        }}
        inputChange={(e) => {
          dispatch(changeTitle(e.target.value))
        }}
        tagsChange={(e) => {
          dispatch(changeTags(e.target.value))
        }}
        descChange={(e) => {
          dispatch(changeDescription(e.target.value))
        }}
        save={() => {
          dispatch(saveArticle())
        }}
        ></EditorContainer>
        <Previewer
        title={editor.title}
        content={editor.content}
        ></Previewer>
      </div>
    )
  }
}
export default connect((state) => ({
  editor: state.editor
}))(Editor)
