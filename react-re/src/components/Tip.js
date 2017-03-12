import React, {Component} from 'react'
export default class Tip extends Component {
  constructor () {
    super()
    this.clear = this.clearForAmoment()
  }
  clearForAmoment () {
    let timer = null
    return () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.props.clear()
      }, 1500);
    }
  }
  render () {
    let {error = {}, clear, isApp} = this.props
    error.message && this.clear()
    return (
      <div onClick={clear} className={`error-tip ${isApp ? 'app' : ''} ${error.message ? 'show' : ''}`}>
        {error.message}
      </div>
    )
  }
}
