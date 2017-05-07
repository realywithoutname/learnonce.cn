import React, {Component} from 'react'
export default class Tip extends Component {
  constructor () {
    super()
    this.clear = this.clearForAmoment()
    this.process = []
    this.curErr = {}
    this.state = {show: false}
  }
  clearForAmoment () {
    let timer = null
    return () => {
      this.curErr = {}
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.hidden()
      }, 1500);
    }
  }
  componentDidUpdate () {
    let {error, clear} = this.props
    if (!error.message) {
      return
    }
    this.process.push(error)
    clear()
    this.show()
  }
  checkMessage () {
    this.curErr = this.process.shift()
    if (!this.curErr) {
      this.curErr = {}
      return this.hidden()
    }
    this.process.length === 0 && !this.curErr.process && this.clear()
  }
  hidden () {
    this.setState({show: false})
  }
  show () {
    this.setState({show: true})
    !this.curErr.message && this.checkMessage()
  }
  confirm () {
    this.curErr.process.call()
    this.checkMessage()
  }
  cancel () {
    this.checkMessage()
  }
  render () {
    let {isApp} = this.props
    return (
      <div onClick={this.hidden.bind(this)} className={`error-tip ${isApp ? 'app' : ''} ${this.state.show ? 'show' : ''}`}>
        <span>{this.curErr.message}</span>
        <button onClick={(e) => {
          e.stopPropagation()
          this.confirm()
        }}>确认</button>
        <button onClick={(e) => {
          e.stopPropagation()
          this.cancel()
        }}>取消</button>
      </div>
    )
  }
}
