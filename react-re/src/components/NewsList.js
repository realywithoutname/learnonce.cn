import React, {Component} from 'react'
import * as style from 'styles/news.css'
import * as post from 'styles/post.css'
import {formatDate} from 'src/util'
export default class News extends Component {
  render () {
    let {news, reading, preview} = this.props
    return (
      <ul style={{overflow: reading === -1 ? 'auto' : 'hidden'}} className={style.list}>
        {Object.keys(news).map((id) => {
          return (
            <li onClick={() => {
              preview(id)
            }} className={style.item} key={id}>
              <h1 className={post.title}>{news[id].title}</h1>
              <section className={post.content} dangerouslySetInnerHTML={
                {__html: news[id].description}
              }>
              </section>
              <div className={post.footer}>
                <div>
                  <a onClick={(e) => {
                    e.stopPropagation()
                  }} className={style.origin} target="_blank" href={news[id].link}>{news[id].from}</a>
                </div>
                <div>{formatDate(news[id].pubTime, 'MM/DD HH:mm')}</div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }
}
