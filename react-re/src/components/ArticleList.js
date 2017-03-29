import React, { Component } from 'react'
import * as style from 'styles/article.css'
import {formatDate} from 'src/util'
import {Link} from 'react-router'
export default class ArticleList extends Component {
  render () {
    let {articles, preview, isAuth, edit, reading, form} = this.props
    return (
      <ul style={{overflow: reading === -1 ? 'auto' : 'hidden'}} className={style.list}>
        {
          Object.keys(articles).map((key) => {
            return (
              <article className={`${style.item} ${articles[key].hidden ? 'hidden' : ''}`} key={key} onClick={(e) => {
                preview(articles[key], e)
              }}>
                <h1 className={style.title}>
                  <Link onClick={(e) => {
                    e.stopPropagation()
                  }} to={'/' + form + '/article/' + articles[key]._id}>
                    {articles[key].title}
                  </Link>
                  <small>{formatDate(articles[key].createTime, 'yyyy MM/dd')}</small>
                </h1>
                <p className={style.description}>
                {articles[key].description}
                </p>
                <div className={style.tags}>
                  <i className={`material-icons ${articles[key].tags ? '' : 'hidden'}`}>label_outline</i>
                  <span>{articles[key].tags}</span>
                  <i onClick={(e) => {
                    e.stopPropagation()
                    edit(articles[key])
                  }} className={`material-icons ${isAuth ? '' : 'hidden'}`}>border_color</i>
                </div>
              </article>
            )
          })
        }
      </ul>
    )
  }
}
