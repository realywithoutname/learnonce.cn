import React, { Component } from 'react'
import styled from 'styled-components'
import { throttle, scroll } from 'src/util'

const Banner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  @media (max-width: 640px) {
    display: none;
  }
`
const Header = styled.div`
  position: ${props => props.skep ? 'fixed' : 'sticky'};
  top: 0;
  display: flex;
  width: 100%;
  margin: 0;
  height: ${props => props.height || '320px'};
  background: ${props => props.skep ? '#1a1b2d' : '#ca3d3d'};
  font-family: Papyrus;
  color: #ff9800;
  vertical-align: middle;
  font-size: 32px;
  text-align: center;
  transition: all ease 0.5s;
  box-shadow: ${props => props.shadow ? '0 3px 6px 3px rgba(142, 142, 142, 0.86)' : 'none'};
  z-index: 1;
`
const Fix = styled.div`
  flex: 1;
  align-self: center;
`

const P = styled.p`
  margin: 0;
`
const Title = P.extend`
  font-size: 64px;
  transition: all ease 0.5s;
  &[data-skep=skep-0] {
    float: left;
    padding-left: 15px;
    height: 128px;
    line-height: 128px;
  }
`

const Footer = styled.div`
  height: ${props => props.sticky ? 0 : '64px'};
  background: #1a1b2d;
  position: absolute;
  top:calc(100% - 64px);
  z-index: 2;
  width: 100%;
  left: 0;
  transition: height ease 0.2s;
`

class Wrapper extends Component {

  constructor() {
    super()
    this.state = {
      sticky: false
    }
    this.onscroll = throttle(this.scroll(), 200)
  }
  componentDidMount() {
    // document.querySelector('body').scrollTop = 0
    this.mounted = true
    this.listener = document.addEventListener('scroll', this.onscroll)
  }
  componentWillUnMount() {
    this.mounted = false
    document.removeEventListener('scroll', this.listener)
  }
  scroll() {
    let body = document.querySelector('body')
    let winHeight = window.innerHeight
    return () => {
      if (!this.mounted) {
        return
      }
      let height = winHeight - body.scrollTop
      if (body.scrollHeight <= winHeight + body.scrollTop + 1) {
        scroll.lock()
      }
      if (height <= 340) {
        this.setState({ sticky: true, height })
        if (height < 200) {
          this.setState({ skep: 'skep-0' })
        } else {
          this.setState({ skep: 'skep-1' })
        }
        return
      }
      this.setState({ sticky: false, skep: '', height: 320 })
    }
  }

  render() {
    return (
      <Banner>
        <Header shadow={this.props.shadow} height={(this.state.height || 320) + 'px'} skep={this.state.skep}>
          <Fix>
            <Title data-skep={this.state.skep}><i>Just so so.</i></Title>
            <P>Not the best, nor the worst. Everything is getting better</P>
          </Fix>
        </Header>
        <Footer sticky={this.state.sticky}></Footer>
      </Banner>
    )
  }
}

export default Wrapper