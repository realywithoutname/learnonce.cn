import React, {Component} from 'react'
import Header from 'components/ide/Header'
import AceEditor from 'components/ide/AceEditor'
import style from 'styles/ide.css'

export default class IEDEditor extends Component {
  constructor () {
    super()
    this.state = {
      activeTab: 1,
      messages: []
    }
    window.onmessage = this.onmessage.bind(this)
  }
  onmessage (e) {
    e.preventDefault()
    try {
      let message = JSON.parse(e.data)
      message.type === 'reload' ? this.setState({messages: []}) : this.setState({messages: [...this.state.messages, message]})
    } catch (e) {
      // console.log(e)
    }
  }
  setScript (text) {
    try {
      eval(text)
      this.props.setScript(text)
      this.setState({messages: []})
    } catch (e) {
      this.props.setScript(text, e.constructor.name !== 'ReferenceError')
    }
  }
  tabChange (index) {
    this.setState({activeTab: index})
  }
  getStyle (index) {
    return {display: this.state.activeTab === index ? 'block' : 'none'}
  }
  render () {
    let {setHtml, setCss, css, html, script, save} = this.props
    return (
      <div onKeyDown={(e) => {
        if (e.ctrlKey && e.keyCode === 83) {
          e.preventDefault()
        }
      }} className={style.ideEditor}>
        <Header save={save} tabChange={this.tabChange.bind(this)}></Header>
        <div className={style.editorContainer}>
          <div style={this.getStyle(1)} className={style.editor}>
            <AceEditor
              mode="html"
              value={html}
              onChange={setHtml}
              ></AceEditor>
          </div>
          <div style={this.getStyle(2)} className={style.editor}>
            <AceEditor
              onChange={setCss}
              value={css}
              mode="css"></AceEditor>
          </div>
          <div style={this.getStyle(3)} className={style.editor}>
            <AceEditor
              value={script}
              onChange={this.setScript.bind(this)}
              mode="javascript"></AceEditor>
          </div>
        </div>
        <div className={`${style.debug} ${script ? '' : 'hidden'}`}>
          {
            // console.log(this.state.messages.length)
            this.state.messages.map((error, index) => {
              return (
                <div key={index} className={`${error.message ? '' : 'hidden'} ${style[error.type]}`}>
                  <span>> </span><span>{error.message}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
