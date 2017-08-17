import React, { Component } from 'react'
import styled from 'styled-components'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'

const md = new Remarkable({
  html: true,
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})

let EditorContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 16px 0;
  box-sizing: border-box;
`
let EditArea = styled.textarea`
  height: 100%;
  width: 50%;
  outline: none;
  border: none;
  resize: none;
  padding: 16px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 2;
  background: rgba(255, 255, 255, .5);
  font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
`
let PreviewArea = styled.div`
  flex: 1;
  padding: 16px;
  box-sizing: border-box;
  overflow: auto;
  background: #fff;
`

const tab = '  '
export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onlyEditor: false
    }
  }
  tabPress() {
    this.setSelectionContent(tab)
  }
  setSelectionContent(content) {
    let el = document.getElementById('editor')
    if (this.DocCanSelection()) {
      document.selection.createRange().text = content
    } else if (this.ElCanSelection(el)) {
      let value = el.value
      let startPosition = el.selectionStart
      el.value = value.substr(0, startPosition) + content + value.substr(startPosition)
      el.selectionStart = startPosition + content.length
      el.selectionEnd = el.selectionStart
    } else {
      el.value += content
    }
    return el.value
  }
  DocCanSelection() {
    return document.selection
  }
  ElCanSelection(el) {
    return this.isNum(el.selectionStart) && this.isNum(el.selectionEnd)
  }
  isNum(val) {
    return typeof val === 'number'
  }
  render() {
    let { content, change } = this.props
    return (
      <EditorContainer>
        <EditArea id="editor" value={content} spellCheck={false} onKeyDown={
          (e) => {
            if (e.keyCode === 9) {
              e.preventDefault()
              this.tabPress(e)
            }
          }
        } onChange={change} placeholder="The article content"></EditArea>
        <PreviewArea className="markdown-body" dangerouslySetInnerHTML={{ __html: md.render(content) }} />
      </EditorContainer>
    )
  }
}
