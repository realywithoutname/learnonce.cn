import React, {Component} from 'react'
import {connect} from 'react-redux'
import style from 'styles/ide.css'
import Editor from 'components/ide/Editor'
import Result from 'components/ide/Result'
import {
  setDemoContent as setContent,
  saveDemo
} from 'src/redux/actions'
class IDE extends Component {
  constructor () {
    super()
    this.state = {
      content: '',
      htmlText: '',
      cssText: '',
      scriptText: ''
    }
  }
  setHtml (text) {
    this.props.dispatch(setContent({html: text}))
    this.getContent()
  }
  setCss (text) {
    this.props.dispatch(setContent({css: text}))
    this.getContent()
  }
  setScript (text, isError) {
    this.props.dispatch(setContent({script: text}))
    !isError && this.getContent()
  }
  getContent () {
    let content = `${this.props.demo.html || ''}
      <style>${this.props.demo.css || ''}</style>
      <script>
      try{
        ${this.props.demo.script || ''}
      }catch(e){debug.error(e)}
      </script>
    `
    this.setState({content: content})
  }
  render () {
    let {demo, dispatch} = this.props
    return (
      <div className={style.ide}>
        <Editor
        save={() => {
          dispatch(saveDemo())
        }}
        setHtml={this.setHtml.bind(this)}
        setCss={this.setCss.bind(this)}
        setScript={this.setScript.bind(this)}
        css={demo.css}
        html={demo.html}
        script={demo.script}
        ></Editor>
        <Result content={this.state.content}></Result>
      </div>
    )
  }
}
export default connect((state) => ({
  demo: state.demo
}))(IDE)
