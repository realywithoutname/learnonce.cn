import React, { Component } from 'react'
import List from 'components/ListStyle'
import Article from './Item'
import styled from 'styled-components'
import { Link } from 'react-router'
import puller from 'src/puller'
let ListTop = styled.li`
  display: flex;
  height: 32px;
  margin-bottom: 16px;
  & button {
    width: 72px;
    margin-right: 8px;
    border: 0;
    outline: none;
    background: none;
    &.active, &:hover {
      color: #006cff;
      border: 1px solid #006cff;
    }
  }
`
const Create = styled(Link) `
  color: #006cff;
  float: right;
  margin-right: 16px;
`

const _filter = {
  limit: 20,
  offset: 0,
  fields: [
    'id',
    'title',
    'createTime',
    'updateTime',
    'description',
    'sourceUrl',
    'tags'
  ],
  sort: { createTime: 'desc' },
  where: { $like: {} }
}

class Blog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: {},
      article: null,
      activeIndex: 1,
      isAuth: puller.pull('auth')
    }
  }
  getArticles(list) {
    this.setState(({ articles }) => {
      list.forEach(article => articles[article._id] = article)
      return { articles }
    })
  }
  viewItem(lock) {
    this.refs.list.lock(lock)
  }
  load(index) {
    let filter = [
      { where: { $like: {} } },
      { where: { $and: [{ translated: { $ne: true } }, { sourceUrl: { $exists: false } }] } },
      { where: { translated: true } },
      { where: { sourceUrl: { $exists: true } } }
    ]
    this.setState({ activeIndex: index, articles: {} })
    this.refs.list.fetch(Object.assign({ offset: 0 }, filter[index - 1]))
  }
  render() {
    const { articles } = this.state

    let ListItems = Object.keys(articles).map(key => {
      const article = articles[key]
      return (
        <Article key={article._id} article={article} view={this.viewItem.bind(this)} />
      )
    })

    return (
      <List ref='list' api='Note' filter={_filter} commit={this.getArticles.bind(this)}>
        <ListTop>
          <button className={this.state.activeIndex === 1 && 'active'} onClick={() => this.load(1)}>全部</button>
          <button className={this.state.activeIndex === 2 && 'active'} onClick={() => this.load(2)}>笔记</button>
          <button className={this.state.activeIndex === 3 && 'active'} onClick={() => this.load(3)}>翻译</button>
          <button className={this.state.activeIndex === 4 && 'active'} onClick={() => this.load(4)}>转载</button>
          <Create style={{ display: this.state.isAuth ? 'inline' : 'none' }} className="material-icons" target="_blank" to={'/article'}>border_color</Create>
        </ListTop>
        {ListItems}
      </List>
    )
  }
}

export default Blog