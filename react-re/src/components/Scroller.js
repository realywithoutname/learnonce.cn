import React, { Component } from 'react'
import {throttle} from 'src/util'
import {scrolling} from 'src/redux/actions'
export default class Scroller extends Component {
  constructor (props) {
    super(props)
    this.scrolling = throttle(this.scroll(), 10)
  }
  scroll () {
    let {dispatch, onScroll} = this.props
    let lastTop = 0
    return (el) => {
      let top = el.scrollTop
      let scrollHeight = el.scrollHeight
      let height = el.offsetHeight
      dispatch(scrolling({
        curTop: top,
        scrollHeight,
        height,
        direction: top > lastTop
      }))
      onScroll && onScroll(el)
      lastTop = top
    }
  }
  render () {
    return (
      <div
        onScroll={(e) => {
          e.persist()
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
