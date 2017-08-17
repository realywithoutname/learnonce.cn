import React, {Component} from 'react'
import List from 'components/ListStyle'
import NewsItem from './Item'
const _filter = {
  where: {},
  limit: 20,
  offset: 0,
  fields: [
    'id',
    'title',
    'star',
    'content',
    'from',
    'link',
    'pubTime',
    'image'
  ],
  sort: { createTime: 'desc' }
}

class News extends Component {
  constructor (props) {
    super(props)
    this.state = {
      news: {}
    }
  }
  getNews (list) {
    this.setState(({ news }) => list.map(item => news[item._id] = item))
  }
  viewItem(lock) {
    this.refs.list.lock(lock)
  }
  componentWillUnmount() {
    // if (Object.keys(this.state.news).length) {
    //   localStorage.setItem('News::LIST', JSON.stringify(this.state.news))
    // }
    this.props.$emit('shadow', false)
  }
  render () {
    const {news} = this.state

    let ListItems = Object.keys(news).map(key => {
      const item = news[key]
      return (
        <NewsItem key={item._id} news={item} view={this.viewItem.bind(this)}/>
      )
    })
    
    return (
      <List ref='list' api='News' emit={this.props.$emit.bind(this.props)} filter={_filter} commit={this.getNews.bind(this)}>
        {ListItems}
      </List>
    )
  }
}

News.defaultProps = {
  $ev: {},
  $on (event, fn) {
    this.$ev[event] = fn
  },
  $emit (event, value) {
    this.$ev[event] && this.$ev[event].call(this, value)
  }
}
export default News