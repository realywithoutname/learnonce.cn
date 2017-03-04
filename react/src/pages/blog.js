import React, {Component} from 'react'
import { connect } from 'react-redux'
import * as style from 'styles/article.css'
import {
  fecthArticlesIfNeeded,
  filterArticlesWithKeyword,
  articleSearchStart,
  articleSearchEnd,
  fetchArticleContent,
  articleReading,
  scrolling,
  ifNeedPull
} from 'src/redux/actions'
import Article from 'components/Article'
import ArticleList from 'components/ArticleList'
import ArticleHeader from 'components/ArticleHeader'
import ArticleFilter from 'components/ArticleFilter'
class Blog extends Component {
  componentDidMount () {
    this.props.dispatch(fecthArticlesIfNeeded())
  }
  preview (article) {
    this.props.dispatch(fetchArticleContent(article._id))
  }
  readed () {
    this.props.dispatch(articleReading())
  }
  filterChange (e) {
    this.props.dispatch(filterArticlesWithKeyword(e.target.value))
  }
  filterInputFocus () {
    const {dispatch} = this.props
  }
  emit (scrollInfo) {
    const {dispatch} = this.props
    dispatch(scrolling(scrollInfo))
  }
  render () {
    const {dispatch, article, isApp, scroll} = this.props
    const barToTop = isApp || (scroll.curTop > 56 || article.searching)
    const toBottom = scroll.scrollHeight - scroll.height - scroll.curTop
    dispatch(ifNeedPull())
    return (
      <section className={isApp ? style.appPage : ''}>
        <ArticleHeader barToTop={barToTop} />
        <ArticleFilter
          barToTop={barToTop}
          className={style.hidden}
          filterChange={this.filterChange.bind(this)}
          searchEnd={() => dispatch(articleSearchEnd())}
          searchStart={() => dispatch(articleSearchStart())} />
        <ArticleList
          barToTop={barToTop}
          reading={article.reading !== -1}
          emit={this.emit.bind(this)}
          className={style.hiddenList}
          articles={article.data}
          preview={this.preview.bind(this)} />
        <Article reading={article.reading} readed={this.readed.bind(this)} article={article.data[article.reading]} />
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
  scroll: state.scroll
}))(Blog)
