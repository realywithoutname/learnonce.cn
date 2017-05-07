import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as style from 'styles/edit.css'
import EditorContainer from 'components/Editor'
import Previewer from 'components/Previewer'
import {
  changeEditor,
  saveArticle,
  clearEditor
} from 'src/redux/actions'
class Editor extends Component {
  render () {
    let {editor, dispatch} = this.props
    return (
      <div className={style.page}>
        <EditorContainer
        article={editor}
        contentChange={(e) => {
          dispatch(changeEditor({content: e.target.value}))
        }}
        inputChange={(e) => {
          dispatch(changeEditor({title: e.target.value}))
        }}
        tagsChange={(e) => {
          dispatch(changeEditor({tags: e.target.value}))
        }}
        descChange={(e) => {
          dispatch(changeEditor({description: e.target.value}))
        }}
        urlChange={(e) => {
          dispatch(changeEditor({sourceUrl: e.target.value}))
        }}
        save={() => {
          dispatch(saveArticle())
        }}
        clear={() => {
          dispatch(clearEditor())
        }}
        isTranslate={() => {
          dispatch(changeEditor({translated: !editor.translated}))
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
