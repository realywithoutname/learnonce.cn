import React, {Component} from 'react'
import * as style from 'styles/edit.css'
const tab = '  '
export default class EditorContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      onlyEditor: false
    }
  }
  tabPress (e) {
    let el = e.target
    if (this.DocCanSelection()) {
      document.selection.createRange().text = tab
    } else if (this.ElCanSelection(el)) {
      let value = el.value
      let startPosition = el.selectionStart
      el.value = value.substr(0, startPosition) + tab + value.substr(startPosition)
      el.selectionStart = startPosition + tab.length
      el.selectionEnd = el.selectionStart
    } else {
      el.value += tab
    }
  }
  DocCanSelection () {
    return document.selection
  }
  ElCanSelection (el) {
    return this.isNum(el.selectionStart) && this.isNum(el.selectionEnd)
  }
  isNum (val) {
    return typeof val === 'number'
  }
  render () {
    let {inputChange, contentChange, descChange, urlChange, isTranslate, tagsChange, save, clear} = this.props
    let {title, description, tags, content, translated, sourceUrl} = this.props.article
    return (
      <div className={style.editor}>
        <div className={style.actionBar}>
          <i style={{textAlign: 'left'}} className="material-icons"
          onClick={() => {
            window.history.back()
          }}>keyboard_return</i>
          <i style={{textAlign: 'center'}} className="material-icons"
          onClick={clear}>clear</i>
          <i style={{textAlign: 'center'}}
          onClick={() => {
            this.setState({onlyEditor: !this.state.onlyEditor})
          }} className={
            `${this.state.onlyEditor ? 'active' : ''} material-icons`
          }>import_export</i>
          <i style={{textAlign: 'center'}} className={
            `${translated ? 'active' : ''} material-icons`
          }
          onClick={isTranslate}>translate</i>
          <i onClick={save} className="material-icons">send</i>
        </div>
        <div className={
          `${this.state.onlyEditor ? 'hidden' : ''} ${style.header}`
        }>
          <input
          value={title}
          onChange={inputChange}
          placeholder="Please input the title"></input>
          <input
          value={tags}
          onChange={tagsChange}
          placeholder="Tags"></input>
        </div>
        <textarea
        spellCheck={false}
        value={description}
        className={
          `${this.state.onlyEditor ? 'hidden' : ''} ${style.desc}`
        }
        onChange={descChange}
        placeholder="The state description"></textarea>
        <textarea
        value={content}
        spellCheck={false} onKeyDown={(e) => {
          if (e.keyCode === 9) {
            e.preventDefault()
            this.tabPress(e)
          }
        }}
        className={style.content}
        onChange={contentChange}
        placeholder="The article content"></textarea>
        <div className={style.sourceUrl}>
          <input
            value={sourceUrl}
            onChange={urlChange}
            placeholder="Enter Source URL"></input>
        </div>
        
      </div>
    )
  }
}
