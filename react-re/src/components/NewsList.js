import React, {Component} from 'react'
import * as style from 'styles/news.css'
import {formatDate} from 'src/util'
export default class News extends Component {
  render () {
    let {news, reading, preview} = this.props
    return (
      <ul style={{overflow: reading === -1 ? 'auto' : 'hidden'}} className={style.newsList}>
        {Object.keys(news).map((id) => {
          return (
            <li onClick={() => {
              preview(id)
            }} className={style.newsItem} key={id}>
              <h1>{news[id].title}</h1>
              <p dangerouslySetInnerHTML={
                {__html: news[id].description}
              }></p>
              <div className={style.itemFooter}>
                <span>{formatDate(news[id].pubTime, 'yyyy MM:DD HH:mm')}</span>
                <span>from {news[id].from}</span>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}
