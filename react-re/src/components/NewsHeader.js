import React, {Component} from 'react'
import {Link} from 'react-router'
import * as style from 'styles/news.css'
export default class News extends Component {
  render () {
    return (
      <header className={style.header}>
        <Link to="/"><img src="/static/image/logo.png" /></Link>
        <span>all of news form internet</span>
      </header>
    )
  }
}
