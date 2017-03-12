import React, {Component} from 'react'
import { connect } from 'react-redux'
// import {Link} from 'react-router'
import * as style from 'styles/news.css'
import Scroller from 'components/Scroller'
import NewsHeader from 'components/NewsHeader'
import NewsList from 'components/NewsList'
import NewsPage from 'components/News'
import {
  fecthNewsIfNeeded,
  fetchMoreNews,
  newsReading
} from 'src/redux/actions'
class News extends Component {
  componentDidMount () {
    this.props.dispatch(fecthNewsIfNeeded())
  }
  preview (id) {
    this.props.dispatch(newsReading(id))
  }
  close () {
    this.props.dispatch(newsReading())
  }
  onScroll () {
    const {dispatch, news, scroll} = this.props
    let toBottom = scroll.scrollHeight - scroll.height - scroll.curTop
    if (toBottom < 500 && !news.isEnd && scroll.direction && !scroll.lock) {
      dispatch(fetchMoreNews())
    }
  }
  render () {
    let {isApp, news, dispatch} = this.props
    return (
      <section
        className={isApp ? style.appPage : ''}>
        <NewsHeader></NewsHeader>
        <Scroller
        dispatch={dispatch}
        onScroll={this.onScroll.bind(this)}
        >
          <NewsList
          news={news.data}
          reading={news.reading}
          preview={this.preview.bind(this)}
          ></NewsList>
        </Scroller>
        <NewsPage
        reading={news.reading}
        news={news.data[news.reading]}
        close={this.close.bind(this)}
        />
      </section>
    )
  }
}
export default connect((state) => ({
  news: state.news,
  isApp: state.isApp,
  scroll: state.scroll
}))(News)
