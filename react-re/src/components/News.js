import React, { Component } from 'react'
import * as style from 'styles/news.css'
export default class ArticleList extends Component {
  render () {
    let {news, reading, close} = this.props
    return (
      <div
      className={`${style.page} ${style.newsContent} ${reading === -1 ? style.pageHidden : style.pageShow}`}
      >
        <header>
          <i onClick={close} className="material-icons">keyboard_backspace</i>
          <span>{news && news.title}</span>
          <i onClick={close} className="material-icons">clear</i>
        </header>
        <div
        onTouchStart={(e) => {
          e.stopPropagation()
        }}
        onTouchMove={(e) => {
          e.stopPropagation()
        }}
        className={`markdown-body ${style.markdown}`}
        dangerouslySetInnerHTML={{__html: news && news.content}}
        >
        </div>
      </div>
    )
  }
}
