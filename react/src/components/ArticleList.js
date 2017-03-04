import React, { Component, PropTypes } from 'react'
import * as style from 'styles/article.css'
import {formatDate, throttle} from 'src/util'
export default class ArticleList extends Component {
  scrolling (emit) {
    let timer = null
    let lastTop = 0
    let counter = 0
    return function (e) {
      let target = e.target
      let top = target.scrollTop
      let sub = top - lastTop
      if (top !== 0 && (top - lastTop < 30 || (top - lastTop < 0 && top - lastTop > -30))) {
        return
      }
      emit({
        curTop: top,
        lastTop,
        height: target.offsetHeight,
        scrollHeight: target.scrollHeight,
        direction: top - lastTop > 0
      })
      lastTop = top
    }
  }
  render () {
    let {articles, preview, emit, barToTop, reading} = this.props
    let scrollFn = this.scrolling(emit)
    return (
      <ul
      style={{overflow: reading ? 'hidden' : 'auto'}}
      onScroll={this.scrolling(emit)}
      onTouchStart={(e) => {
        e.stopPropagation()
      }}
      onTouchMove={(e) => {
        e.stopPropagation()
      }}
      className={
        barToTop ? style.topArticleList : style.articleList
      }>
        {
          Object.keys(articles).map((key) => {
            return (
              <article className={`${style.articleItem} ${articles[key].hidden ? 'global-hidden' : ''}`} key={key} onClick={(e) => {
                preview(articles[key], e)
              }}>
                <h1 className={style.title}>
                  {articles[key].title}
                  <small>{formatDate(articles[key].createTime, 'yyyy MM/dd')}</small>
                </h1>
                <p className={style.description}>{articles[key].description}</p>
                {
                  articles[key].tags && (
                    <div className={style.tags}>
                      <i className='global-material-icons'>label_outline</i>
                      <span>{articles[key].tags}</span>
                    </div>
                  )
                }
              </article>
            )
          })
        }
      </ul>
    )
  }
}
