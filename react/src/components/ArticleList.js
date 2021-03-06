import React, { Component, PropTypes } from 'react'
import * as style from 'styles/article.css'
import {formatDate} from 'src/util'
export default class ArticleList extends Component {
  render () {
    let {articles, preview, barToTop, reading} = this.props
    return (
      <ul className={
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
