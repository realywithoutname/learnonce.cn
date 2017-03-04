import React, {Component} from 'react'
import {Link} from 'react-router'
export default class Me extends Component {
  render () {
    return (
      <div>
        <Link to="/blog">blog</Link><br />
        <Link to="/news">news</Link><br />
        <Link to="/me">me</Link><br />
        {this.props.children}
      </div>
    )
  }
}
