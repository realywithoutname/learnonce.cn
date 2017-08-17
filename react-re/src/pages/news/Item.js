import React, { Component } from 'react'
import styled from 'styled-components'
import ListItem from 'components/ListItemStyle'
import { formatDate } from 'src/util'

const Time = styled.span`
  color: #666;
  opacity: .4;
`

const Tag = styled.b`
  margin: 8px;
  color: rgba(255, 152, 0, .6);
  font-weight: 100;
  text-shadow: 0 1px 1px rgba(121, 121, 121, 0.26);
`


class NewsItem extends Component {
  constructor(props) {
    super(props)
    this.state = { data: props.news }
  }
  close() {
    // console.log('close')
    this.props.view(false)
    this.setState({ show: false })
  }
  viewItem() {
    this.props.view(true)
    this.setState({ show: true, data: this.props.news })
  }
  render() {
    let { news } = this.props
    return (
      <ListItem onClick={this.viewItem.bind(this)}>
        <ListItem.Header>{news.title}</ListItem.Header>
        <ListItem.Description content={news.description} />
        <ListItem.Content show={!!this.state.show} data={news} close={this.close.bind(this)} />
        <ListItem.Footer>
          <Time>{formatDate(news.pubTime, 'YY·MM·DD')}</Time>
          <a onClick={e => e.stopPropagation()} href={news.link} target="_blank"><Tag>{news.from}</Tag></a>
        </ListItem.Footer>
      </ListItem>
    )
  }
}

export default NewsItem