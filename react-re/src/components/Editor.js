import React, {Component} from 'react'
import * as style from 'styles/edit.css'
const tab = '  '
export default class EditorContainer extends Component {
  constructor (props) {
    super(props)
    let article = props.article || {}
    this.state = {
      onlyEditor: false,
      title: article.title || '',
      description: article.description || '',
      tags: article.tags || '',
      content: article.content || ''
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
    let {inputChange, contentChange, descChange, tagsChange, save} = this.props
    return (
      <div className={style.editor}>
        <div className={
          `${this.state.onlyEditor ? 'hidden' : ''} ${style.header}`
        }>
          <input defaultValue={this.state.title}
          onChange={inputChange}
          placeholder="Please input the title"></input>
          <input onChange={tagsChange}
          defaultValue={this.state.tags}
          placeholder="Tags"></input>
        </div>
        <textarea spellCheck={false}
        defaultValue={this.state.description}
        className={
          `${this.state.onlyEditor ? 'hidden' : ''} ${style.desc}`
        } onChange={descChange} placeholder="The state description"></textarea>
        <textarea defaultValue={this.state.content}
        spellCheck={false} onKeyDown={(e) => {
          if (e.keyCode === 9) {
            e.preventDefault()
            this.tabPress(e)
          }
        }}
        className={style.content} onChange={contentChange} placeholder="The article content"></textarea>
        <div className={style.actionBar}>
          <i style={{textAlign: 'left'}} className="material-icons"
          onClick={() => {
            window.history.back()
          }}>keyboard_return</i>
          <i style={{textAlign: 'center'}}
          onClick={() => {
            this.setState({onlyEditor: !this.state.onlyEditor})
          }} className={
            `${this.state.onlyEditor ? 'active' : ''} material-icons`
          }>import_export</i>
          <i onClick={save} className="material-icons">send</i>
        </div>
      </div>
    )
  }
}
