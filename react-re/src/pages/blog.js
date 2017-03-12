import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as style from 'styles/article.css'
import {
  fecthArticlesIfNeeded,
  filterArticlesWithKeyword,
  articleSearchStart,
  articleSearchEnd,
  articleReading,
  scrolling,
  fetchMoreArticle,
  editArticle
} from 'src/redux/actions'
import Scroller from 'components/Scroller'
import Article from 'components/Article'
import ArticleList from 'components/ArticleList'
import ArticleHeader from 'components/ArticleHeader'
import ArticleFilter from 'components/ArticleFilter'
class Blog extends Component {
  componentDidMount () {
    this.props.dispatch(fecthArticlesIfNeeded())
  }
  reading (article) {
    this.props.dispatch(articleReading(article._id))
  }
  readed () {
    this.props.dispatch(articleReading())
  }
  filterChange (e) {
    this.props.dispatch(filterArticlesWithKeyword(e.target.value))
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
    const {dispatch, article, isApp, scroll, isAuth} = this.props
    const barToTop = isApp || (scroll.curTop > 56 || article.searching)
    return (
      <section className={isApp ? style.appPage : ''}>
        <ArticleHeader isAuth={isAuth} barToTop={barToTop} />
        <ArticleFilter
          barToTop={barToTop}
          className={style.hidden}
          filterChange={this.filterChange.bind(this)}
          searchEnd={() => dispatch(articleSearchEnd())}
          searchStart={() => dispatch(articleSearchStart())} />
        <Scroller
          onScroll={this.readMore.bind(this)}
          dispatch={dispatch}>
          <ArticleList
            barToTop={barToTop}
            isAuth={isAuth}
            edit={(article) => {
              dispatch(editArticle(article))
            }}
            reading={article.reading !== -1}
            className={style.hiddenList}
            articles={article.data}
            preview={this.reading.bind(this)} />
        </Scroller>
        <Article reading={article.reading} close={this.readed.bind(this)} article={article.data[article.reading]} />
      </section>
    )
  }
}
function filterArticles (articles, title) {
  let data = articles.data
  let results = Object.keys(data).reduce((result, id) => {
    if (title && new RegExp(title).test(data[id].title)) {
      data[id].hidden = false
    } else if (title) {
      data[id].hidden = true
    } else {
      data[id].hidden = false
    }
    return data
  }, {})
  articles.data = results
  return articles
}
export default connect((state) => ({
  article: filterArticles(state.articles, state.articles.filter.where.$like.title),
  isApp: state.isApp,
  scroll: state.scroll,
  isAuth: state.isAuth
}))(Blog)
