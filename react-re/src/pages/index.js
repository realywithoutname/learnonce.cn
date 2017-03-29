import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import * as style from 'styles/index.css'
class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {showMenu: false}
  }
  render () {
    let {isApp, finger, isAuth} = this.props
    return (
      <div
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.preventDefault()}
        className={style.page}>
        <h1>
          Just so so.
        </h1>
        <div className={style.justspan}>
          <span></span>
        </div>
        <div className={style.links}>
          <Link to="/blog">Article</Link>
          <Link to="/news">News</Link>
          <Link to="/Translate">Translate</Link>
        </div>
        <div className={style.finger}>
          <span>{finger}</span>
        </div>
      </div>
    )
    // <Link to="/demo">Demo</Link>
    // {!isApp && isAuth && <Link to="/ide">Web IDE</Link>}
  }
}
export default connect((state) => ({
  isApp: state.isApp,
  finger: state.finger,
  isAuth: state.isAuth
}))(Index)
