import React, {Component} from 'react'
import style from 'styles/ide.css'
export default class EditorResult extends Component {
  constructor () {
    super()
    this.state = {
      logs: []
    }
  }
  componentDidUpdate () {
    try {
      this.refs.editorResultFrame.contentDocument.open()
      let content = '<script src="/static/console.js"></script>'
      content += this.props.content
      this.refs.editorResultFrame.contentDocument.write(content)
    } catch (e) {
      // console.log(e)
    }
  }
  render () {
    return (
      <div className={style.result}>
        <iframe ref="editorResultFrame">
        </iframe>
      </div>
    )
  }
}
