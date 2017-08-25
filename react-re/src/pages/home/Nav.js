import React, { Component } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'

const Nav = styled.nav`
  width: 164px;
  position: relative;
  @media (max-width: 640px) {
    display: none;
  }
`
const SLink = styled(Link) `
  display: block;
  height: 64px;
  line-height: 64px;
  text-align: center;
  font-size: 18px;
  letter-spacing: 8px;
  color: #ff9800;
  &:first-child {
    margin-top: calc(50vh - 144px - 128px);
  }
`
const Finger = styled.p`
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  color: #9a9a9a;
  line-height: 22px;
`

class NavBar extends Component {
  render() {
    let { isAuth } = this.props
    return (
      <Nav>
        <SLink to="/blog">文章</SLink>
        <SLink to="/news">资讯</SLink>
        <SLink to="/demos">实例</SLink>
        {isAuth && <SLink target="_blank" to="/IDE">IDE</SLink>}
        <SLink to="/about">关于</SLink>
        <Finger>{this.props.finger}<br />koa·react</Finger>
      </Nav>
    )
  }
}

export default NavBar