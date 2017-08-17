import React, { Component } from 'react'
import List from 'components/ListStyle'
import DemoItem from './Item'
const _filter = {
  where: {},
  limit: 20,
  offset: 0,
  fields: [
    'id',
    'title',
    'createTime'
  ],
  sort: { createTime: 'desc' }
}

class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Demos: {}
    }
  }
  getDemo(list) {
    this.setState(({ Demos }) => list.map(item => Demos[item._id] = item))
  }
  componentWillUnmount() {
    this.props.$emit('shadow', false)
  }
  render() {
    const { Demos } = this.state

    let ListItems = Object.keys(Demos).map(key => {
      const item = Demos[key]
      return (
        <DemoItem key={item._id} demo={item} />
      )
    })

    return (
      <List ref='list' api='Demo' emit={this.props.$emit.bind(this.props)} filter={_filter} commit={this.getDemo.bind(this)}>
        {ListItems}
      </List>
    )
  }
}

Demo.defaultProps = {
  $ev: {},
  $on(event, fn) {
    this.$ev[event] = fn
  },
  $emit(event, value) {
    this.$ev[event] && this.$ev[event].call(this, value)
  }
}
export default Demo