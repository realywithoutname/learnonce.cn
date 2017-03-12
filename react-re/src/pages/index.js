import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import * as style from 'styles/index.css'
class Index extends Component {
  render () {
    let {isApp, finger} = this.props
    return (
      <div
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.preventDefault()}
        className={isApp ? style.appPage : style.page}>
        <div className={style.links}>
        <Link to="/blog">blog</Link>
        <Link to="/news">news</Link>
        </div>
        <div className={style.finger}>{finger}</div>
      </div>
    )
  }
}
export default connect((state) => ({
  isApp: state.isApp,
  finger: state.finger
}))(Index)
