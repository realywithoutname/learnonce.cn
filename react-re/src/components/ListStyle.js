import React, { Component } from 'react'
import styled from 'styled-components'

import _Scroller from 'components/Scroller'
import API from 'src/api-config'
import puller from 'src/puller'
import Loading from 'components/Loading'
import EndBottom from 'components/EndBottom'

import { scroll } from 'src/util'

const Scroller = styled(_Scroller) `
  flex: 1;
`
const List = styled.ul`
  height: 100%;
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 0 16px;
  body.lock & {
    overflow: auto;
  }
`
const ListTop = styled.li`
  margin-top: 64px;
`
const ListBottom = styled.li`
  display: flex;
`
let isShadow = false

class ListStyle extends Component {
  constructor(props) {
    super(props)
    this.filter = props.filter
    this.api = props.api
    this.state = {
      loading: false,
      isEnd: false
    }
  }
  componentDidMount() {
    this.fetch()
  }
  lock(istrue) {
    let e = document.getElementById('list')
    istrue ? scroll.lock(e) : scroll.unLock(e)
  }
  scrolling(data) {
    let toBottom = data.scrollHeight - data.height - data.curTop
    if (data.curTop < 64 && isShadow) {
      isShadow = false
      this.props.emit('shadow', false)
    } else if (data.curTop >= 64 && !isShadow) {
      isShadow = true
      this.props.emit('shadow', true)
    }
    if (toBottom < 500 && !this.state.isEnd && data.direction && !this.state.loading) {
      this.fetch({ offset: this.filter.offset + this.filter.limit })
    }
  }
  fetch(filter = {}) {
    this.setState({ loading: true })
    return API[this.api].find(Object.assign(this.filter, filter))
      .then(({ data }) => {
        this.setState({ loading: false })
        this.props.commit(data)
        if (data.length === 0 || data.length < this.filter.limit) {
          this.setState({ isEnd: true })
          return
        } else {
          this.setState({ isEnd: false })
        }
      })
      .catch(() => {
        this.setState({ loading: false })
        puller.push('message', '获取列表失败，请点击刷新按钮刷新')
      })
  }
  render() {
    return (
      <Scroller onScroll={this.scrolling.bind(this)} interval={20}>
        <List id="list" ref="scroll-list">
          <ListTop></ListTop>
          {this.props.children}
          <ListBottom>
            <Loading loading={this.state.loading} />
            <EndBottom isEnd={this.state.isEnd && !this.state.loading} />
          </ListBottom>
        </List>
      </Scroller>
    )
  }
}

export default ListStyle