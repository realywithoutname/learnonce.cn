import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import puller from 'src/puller'

const Container = styled.div`
  position: absolute;
  bottom: -3px;
  height: 3px;
  background-image: linear-gradient(to right,rgba(26, 27, 45, 0.25),rgba(255, 0, 0, 0.5),rgba(255, 0, 0, 0.75),#ff9800);
  box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  transition: width ease 0.1s;
  & > i {
    position: absolute;
    right: 0;
    width: 12px !important;
    height: 12px !important;
    line-height: 12px !important;
    font-size: 6px;
    background-image: radial-gradient(circle at center, #ff9800, rgba(255, 0, 0, 0.75));
    color: #fff;
    border-radius: 12px;
    top: -4px;
    transition: all ease 0.3s;
    cursor: default;
  }
  & > i[data-top=false] {
    transform: rotate(90deg);
    background-image: none;
    top: -5px;
    right: -4px;
    color: #ff9800;
  }
`
class ProgressBar extends Component {
  constructor (props) {
    super()
    this.state = { direction: false, curTop: 0, scrollHeight: 0, height: window.innerHeight}
    puller.on(props.listenerName || 'scroll', (data) => {
      this.mounted && this.setState({ ...data })
    })
  }
  componentDidMount () {
    this.mounted = true
  }
  componentWillUnmount () {
    this.mounted = false
    puller.destroy(this.props.listenerName || 'scroll')
  }
  render() {
    let scroll = this.state
    let point = (scroll.curTop) / (scroll.scrollHeight - scroll.height) * 100
    return (
      <Container point={point} style={{width: point + '%'}}>
        <i onClick={
          () => puller.push((this.props.listenerName || 'scroll') + '-to-top')
        } data-top={!scroll.direction} className="material-icons">arrow_upward</i>
      </Container>
    )
  }
}

export default ProgressBar