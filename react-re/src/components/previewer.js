import React, {Component} from 'react'
import * as style from 'styles/edit.css'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'
const md = new Remarkable({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
export default class Previewer extends Component {
  render () {
    let {title, content} = this.props
    return (
      <div className={style.previewer}>
        <header>
          <h1>{title}</h1>
        </header>
        <div className='markdown-body' dangerouslySetInnerHTML={
          {__html: (md.render(content))}
        }></div>
      </div>
    )
  }
}
