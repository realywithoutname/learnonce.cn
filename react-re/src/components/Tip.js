import React, { Component } from 'react'
import puller from 'src/puller'
import styld from 'styled-components'

let TipBar = styld.div`
  opacity: ${props => props.show ? 1 : 0};
  position: fixed;
  background: #ca3d3d;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 9px 0px rgba(50, 50, 50, 0.6);
  color: #fff;
  z-index: ${props => props.show ? 100 : -1};
  transition: opacity ease-in-out .3s;
`

let Message = styld.div`
  height: 64px;
  line-height: 48px;
  white-space: nowrap;
  overflow: hidden;
  padding: 8px;
  box-sizing: border-box;
`

let Btn = styld.button`
  border: none;
  background: transparent;
  color: #ff9800;
  font-size: 16px;
  line-height: 48px;
  position: absolute;
  top: 8px;
  right: 15px;
  outline: none;
`
export default class Tip extends Component {
  constructor() {
    super()
    this.state = { show: false, message: {} }
    this.messages = []
    this.check()
    puller.on('message', (message) => {
      message = typeof message === 'string' ? { message } : message
      this.messages.push(message)
      this.check()
    })
  }

  componentDidMount() {
    this.mounted = true
    this.check()
  }

  componentWillUnMount() {
    this.mounted = false
    clearTimeout(this.timer)
    this.timer = null
  }

  check() {
    if (this.timer || !this.mounted) {
      return
    }
    if (this.messages.length === 0) {
      this.setState({ show: false })
      return
    }
    this.queen(this.messages.shift())
  }

  queen(message) {
    this.setState({ message: message, show: true })
    if (message.ok || message.cancel) {
      return
    }
    this.timer = setTimeout(() => {
      this.timer = null
      this.check()
    }, 2 * 1000)
  }

  close() {
    clearTimeout(this.timer)
    this.timer = null
    this.check()
  }
  cancel() {
    this.state.message.cancel && this.state.message.cancel()
    this.timer = null
    this.check()
  }
  ok() {
    this.state.message.ok && this.state.message.ok()
    this.timer = null
    this.check()
  }
  render() {
    let show = this.state.message.ok || this.state.message.cancel
    return (
      <TipBar show={this.state.show}>
        <Message onClick={this.close.bind(this)}>{this.state.message.message}</Message>
        {show && <Btn onClick={this.ok.bind(this)} style={{ right: '64px' }}>确认</Btn>}
        {show && <Btn onClick={this.cancel.bind(this)}>取消</Btn>}
      </TipBar>
    )
  }
}
