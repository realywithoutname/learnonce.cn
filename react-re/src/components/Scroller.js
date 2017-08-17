import React, { Component } from 'react'
import {throttle} from 'src/util'
export default class Scroller extends Component {
  constructor (props) {
    super(props)
    this.scrolling = throttle(this.scroll(), props.interval)
  }
  scroll () {
    let {onScroll} = this.props
    let lastTop = 0
    return (el) => {
      let top = el.scrollTop
      let scrollHeight = el.scrollHeight
      let height = el.offsetHeight
      onScroll && onScroll({
        curTop: top,
        scrollHeight,
        height,
        direction: top > lastTop
      })
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
