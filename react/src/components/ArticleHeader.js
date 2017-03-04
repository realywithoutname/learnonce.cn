import React, { Component, PropTypes } from 'react'
import * as style from 'styles/article.css'
import {Link} from 'react-router'
export default class ArticleList extends Component {
  render () {
    let {articles, preview, barToTop} = this.props
    return (
      <header className={barToTop ? style.topHeader : style.header}>
        <Link to="/">
          <img src="/assets/image/logo.png" />
        </Link>
        <Link to="/">
          <i className="global-material-icons">border_color</i>
        </Link>
        <div className={style.headerTitle}>
          <span>{parseInt(101010101010101 * 9).toString(2)}</span>
          <span>{parseInt(101010101010101 * 8).toString(2)}</span>
          <span>{parseInt(101010101010101 * 7).toString(2)}</span>
          <span>{parseInt(101010101010101 * 6).toString(2)}</span>
          <span>{parseInt(101010101010101 * 5).toString(2)}</span>
          <span>{parseInt(101010101010101 * 4).toString(2)}</span>
          <span>{parseInt(101010101010101 * 3).toString(2)}</span>
          <span>{parseInt(101010101010101 * 2).toString(2)}</span>
          <span>{parseInt(101010101010101 * 1).toString(2)}</span>
          <span>{parseInt(101010101010101).toString(2)}</span>
        </div>
        {
          !barToTop && (
            <div className={style.stack}>
              <span>Vue</span>
              <span>Angular</span>
              <span>React</span>
              <span>Node</span>
              <span>Html5</span>
              <span>CSS</span>
              <span>MySql</span>
              <span>MongoDB</span>
              <span>Express</span>
              <span>Koa</span>
              <span>webpack</span>
              <span>Git</span>
            </div>
          )
        }
      </header>
    )
  }
}
