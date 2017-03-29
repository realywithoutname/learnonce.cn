import React, { Component } from 'react'
import * as style from 'styles/view-page.css'
export default class ArticleList extends Component {
  render () {
    let {news, reading, close} = this.props
    return (
      <div
      className={`${style.view} ${reading === -1 ? style.hidden : style.show}`}
      >
        <header className={style.header}>
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
        className={`markdown-body ${style.content}`}
        dangerouslySetInnerHTML={{__html: news && news.content}}
        >
        </div>
      </div>
    )
  }
}
