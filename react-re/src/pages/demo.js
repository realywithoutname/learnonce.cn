import React, {Component} from 'react'
import { connect } from 'react-redux'
class InputComponent extends Component {
  render () {
    let {val, inputChange} = this.props
    return <input onChange={inputChange}/>
  }
}
class ParentComponent extends Component {
  constructor () {
    super()
    this.state = {
      val: ''
    }
  }
  componentDidMount () {
    console.log(this)
  }
  inputChange (e) {
    this.setState({val: e.target.value})
  }
  render () {
    let val = this.state.val
    return (
      <section>
        {val}
        <InputComponent val={val} inputChange={this.inputChange.bind(this)}/>
      </section>
    )
  }
}
export default connect((state) => ({
}))(ParentComponent)
