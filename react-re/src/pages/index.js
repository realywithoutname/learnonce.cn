import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import * as style from 'styles/index.css'
import Scroller from 'components/Scroller'
import {formatDate} from 'src/util'
import {fecthArticlesIfNeeded, destroyArticle} from 'src/redux/actions'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {showMenu: false, scrollTop: false}
  }
  scrolling (scroll) {
    this.setState({scrollTop: scroll.direction})
  }
  componentDidMount () {
    this.props.dispatch(fecthArticlesIfNeeded({
      fields: [
        'id', 'title', 'updateTime', 'translated', 'sourceUrl'
      ],
      sort: {createTime: -1},
      limit: 1000
    }))
  }
  render () {
    let {isApp, finger, isAuth, article, dispatch} = this.props
    article = article.data
    return (
      <Scroller
        className="container"
        onScroll={this.scrolling.bind(this)}
        dispatch={dispatch}>
      <div
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.preventDefault()}
        className={`${style.page} ${this.state.scrollTop ? style.scrolling : ''}`}>
        <h1>
          Just so so.
        </h1>
        <div className={style.justLogo}>
          <img src="/static/image/logo-copy.png" />
        </div>
        <div className={style.links}>
          <Link to="/blog">My Notes</Link>
          <Link to="/news">World Daily</Link>
          <Link to="/Translate">Translate Texts</Link>
        </div>
        <div className={style.welcome}>
          <span>Welcome, guy !</span>
        </div>
        <div className={style.articles}>
          <div className={style.scrollTable}>
          <ul onScroll={(e) => e.stopPropagation()}>
          {
            Object.keys(article).map((key) => {
              let post = article[key]
              return (
                <li key={key}>
                  {
                    article[key].sourceUrl ? (
                      <a href={article[key].sourceUrl} target="_blank">{article[key].title}</a>
                    ) : (
                      <Link to={
                        `/${post.translated ? 'translate' : 'blog'}/article/${post._id}`
                      }>
                      {post.title}
                      </Link>
                    )
                  }
                <time>{
                  formatDate(post.updateTime, 'yyyy/MM/dd')
                }</time>
                {
                  isAuth && (<span onClick={() => {
                    dispatch(destroyArticle(key))
                  }}>×</span>)
                }
                </li>
              )
            })
          }
          </ul>
          <h2>才疏学浅，如有错误，万望海涵。—— 刘某</h2>
          </div>
        </div>
        <div className={style.finger}>
          <span>{finger}</span>
        </div>
      </div>
      </Scroller>
    )
    // <Link to="/demo">Demo</Link>
    // {!isApp && isAuth && <Link to="/ide">Web IDE</Link>}
  }
}
export default connect((state) => ({
  isApp: state.isApp,
  finger: state.finger,
  isAuth: state.isAuth,
  article: state.articles
}))(Index)
