import React, { Component } from 'react'
import {throttle} from 'src/util'
import puller from 'src/puller'
let _el = false

export default class Scroller extends Component {
  constructor (props) {
    super(props)
    this.scrolling = throttle(this.scroll(), props.interval)
    puller.on('scroll-to-top', () => {
      if (_el) _el.scrollTop = 0
    })
  }
  componentWillUnmount() {
    puller.destroy('scroll-to-top')
  }
  scroll () {
    let {onScroll} = this.props
    let lastTop = 0
    return (el) => {
      _el = el
      let top = el.scrollTop
      let scrollHeight = el.scrollHeight
      let height = el.offsetHeight
      let data = {
        curTop: top,
        scrollHeight,
        height,
        direction: top > lastTop
      }
      onScroll && onScroll(data)
      puller.push('scroll', data)
      lastTop = top
    }
  }
  render () {
    return (
      <div
        className={this.props.className}
        onScroll={(e) => {
          e.persist()
          e.stopPropagation()
          this.scrolling(e.target)
        }}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
      {this.props.children}
      </div>
    )
  }
}
