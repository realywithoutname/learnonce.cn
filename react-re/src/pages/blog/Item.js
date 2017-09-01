import React, { Component } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import API from 'src/api-config'
import ListItem from 'components/ListItemStyle'
import { formatDate } from 'src/util'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'
import puller from 'src/puller'

const md = new Remarkable({
  html: true,
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})

const Time = styled.span`
  color: #666;
  opacity: .4;
`

const Tag = styled.b`
  margin: 8px;
  color: rgba(255, 152, 0, .4);
  text-shadow: 0 -1px 1px rgba(121, 121, 121, 0.26);
`

const Edit = styled(Link) `
  color: #1a1b2d;
  float: right;
  margin-right: 16px;
`
const Icon = styled.i`
  position: absolute;
  right: 0;
  top: 0;
  display: none;

  h2:hover & {
    display: inline;
  }
`
class ArticleItem extends Component {
  constructor(props) {
    super(props)
    this.article = props.article
    this.state = { isAuth: puller.pull('auth') }
  }
  close() {
    this.props.view(false)
    this.setState({ show: false })
  }
  viewItem() {
    this.props.view(true)
    let article = this.article
    if (article.content) {
      return this.setState({ show: true, data: article })
    }
    API.Note.findById(article._id).then(({ data: article }) => {
      article.content = md.render(article.content || '暂时没有内容')
      this.setState({ show: true, data: article })
      this.article = article
    })
  }
  deleteItem() {
    puller.push('message', {
      message: '确认删除吗',
      ok: () => API.Note.deleteById(this.props.article._id).then(() => puller.push('message', '删除成功')).catch(() => puller.push('message', '删除失败'))
    })
  }
  render() {
    let { article } = this.props
    return (
      <ListItem onClick={this.viewItem.bind(this)}>
        <ListItem.Header>
          {
            article.sourceUrl ?
              <a target="_blank" onClick={e => e.stopPropagation()} href={article.sourceUrl}>{article.title}</a>
              : <Link onClick={e => e.stopPropagation()} to={`/blog/${article._id}`} target="_blank">{article.title}</Link>
          }
          { this.state.isAuth && <Icon onClick={
            e => {
              e.stopPropagation()
              this.deleteItem()
            }
          } className="material-icons">clear</Icon>}
        </ListItem.Header>
        <ListItem.Description content={article.description} />
        <ListItem.Content show={!!this.state.show} data={this.state.data} close={this.close.bind(this)} />
        <ListItem.Footer>
          <Time>{formatDate(article.createTime, 'YY·MM·DD')}-{formatDate(article.updateTime, 'YY·MM·DD')}</Time>
          {(article.tags || '').replace('，', ',').split(',').map(tag => <Tag key={tag}>{tag}</Tag>)}
          <Edit style={{ display: this.state.isAuth ? 'inline' : 'none' }} className="material-icons" target="_blank" to={`/article/${article._id}`} onClick={e => e.stopPropagation()}>border_color</Edit>
        </ListItem.Footer>
      </ListItem>
    )
  }
}

export default ArticleItem