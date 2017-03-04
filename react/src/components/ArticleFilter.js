import React, { Component, PropTypes } from 'react'
import {throttle} from '../util'
import * as style from 'styles/article.css'
export default class ArticleList extends Component {
  constructor (props) {
    super(props)
    this.lastFilter = ''
    this.filterChange = throttle(this.props.filterChange, 1000)
  }
  render () {
    let {searchStart, searchEnd, barToTop} = this.props
    return (
      <div className={
        barToTop ? style.topArticleFilter : style.articleFilter
      }>
        <input type="search"
          onBlur={searchEnd}
          onFocus={searchStart}
          onChange={(e) => {
            e.persist()
            this.filterChange(e)
          }}
          placeholder="Search" />
      </div>
    )
  }
}
