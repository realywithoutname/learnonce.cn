import React, {Component} from 'react'
import {Link} from 'react-router'
import { connect } from 'react-redux'
import * as style from 'styles/article.css'
import {
  fecthArticlesIfNeeded,
  setFecthArticlesFilter,
  articleReading,
  scrolling,
  fetchMoreArticle,
  editArticle
} from 'src/redux/actions'
import Scroller from 'components/Scroller'
import Article from 'components/Article'
import ArticleList from 'components/ArticleList'
class Translate extends Component {
  componentDidMount () {
    this.props.dispatch(setFecthArticlesFilter({
      key: 'where', filter: {translated: true}
    }))
    this.props.dispatch(fecthArticlesIfNeeded())
  }
  reading (article) {
    this.props.dispatch(articleReading(article._id))
  }
  readed () {
    this.props.dispatch(articleReading())
  }
  emit (scrollInfo) {
    const {dispatch} = this.props
    dispatch(scrolling(scrollInfo))
  }
  readMore () {
    const {dispatch, article, scroll} = this.props
    let toBottom = scroll.scrollHeight - scroll.height - scroll.curTop
    if (toBottom < 500 && !article.isEnd && scroll.direction && !scroll.lock) {
      dispatch(fetchMoreArticle())
    }
  }
  render () {
    const {dispatch, article, isAuth} = this.props
    return (
      <section className={style.toTop}>
        <header className={style.header}>
          <Link to="/"><img src="/static/image/logo.png" /></Link>
        </header>
        <Scroller
          onScroll={this.readMore.bind(this)}
          dispatch={dispatch}>
          <ArticleList
            isAuth={isAuth}
            edit={(article) => {
              dispatch(editArticle(article))
            }}
            form="translate"
            reading={article.reading}
            className={style.hiddenList}
            articles={article.data}
            preview={this.reading.bind(this)} />
        </Scroller>
        <Article reading={article.reading} close={this.readed.bind(this)} article={article.data[article.reading]} />
      </section>
    )
  }
}

export default connect((state) => ({
  article: state.articles,
  scroll: state.scroll,
  isAuth: state.isAuth
}))(Translate)
