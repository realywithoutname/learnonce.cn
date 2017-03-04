import React, { Component, PropTypes } from 'react'
import Remarkable from 'remarkable'

import * as style from 'styles/article.css'
const md = new Remarkable()
export default class ArticleList extends Component {
  render () {
    let {article, reading, readed} = this.props
    return (
      <div
      className={`${style.page} ${reading === -1 ? style.pageHidden : style.pageShow}`}
      >
        <header>
          <i onClick={readed} className="global-material-icons">keyboard_backspace</i>
          <span>{article && article.title}</span>
          <i onClick={readed} className="global-material-icons">clear</i>
        </header>
        <div
        onTouchStart={(e) => {
          e.stopPropagation()
        }}
        onTouchMove={(e) => {
          e.stopPropagation()
        }}
        className={style.markdown}
        dangerouslySetInnerHTML={
          {__html: (md.render(article && article.content))}
        }
        >
        </div>
      </div>
    )
  }
}
