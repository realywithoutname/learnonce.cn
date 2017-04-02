import React, { Component } from 'react'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'
const md = new Remarkable({
  html: true,
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
import * as style from 'styles/view-page.css'
export default class ArticleList extends Component {
  render () {
    let {article, reading, close} = this.props
    return (
      <div
      className={`${style.view} ${reading === -1 ? style.hidden : style.show}`}
      >
        <header className={style.header}>
          <i onClick={close} className="material-icons">keyboard_backspace</i>
          <span>{article && article.title}</span>
          <i onClick={close} className="material-icons">clear</i>
        </header>
        <div
        onTouchStart={(e) => {
          e.stopPropagation()
        }}
        onTouchMove={(e) => {
          e.stopPropagation()
        }}
        className={`markdown-body ${style.content}`}
        dangerouslySetInnerHTML={
          {__html: (md.render(article && article.content))}
        }
        >
        </div>
      </div>
    )
  }
}
