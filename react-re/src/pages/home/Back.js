import React, { Component } from 'react'
import styled from 'styled-components'

const Header = styled.header`
  height: calc(100% - 64px);
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  @media (max-width: 640px) {
    display: none;
  }
`
const Welcome = styled.div`
  height: calc(100% - 320px);
  background: #fff;
  font-size: 64px;
  text-align: center;
  transition: all 1.2s ease;
  font-weight: 900;
  vertical-align: middle;
  font-family: Papyrus;
  &::before {
    content: '';
    background: #fff;
    display: inline-block;
    width: 1px;
    height: 100%;
    vertical-align: middle;
  }
`

const Nav = styled.nav`
  height: 320px;
  background: #fff;
  font-family: Papyrus;
  color: #ff9800;
  display: flex;
`
class Back extends Component {
  render() {
    return (
      <Header>
        <Nav />
        <Welcome> welcome guy </Welcome>
      </Header>
    )
  }
}

export default Back