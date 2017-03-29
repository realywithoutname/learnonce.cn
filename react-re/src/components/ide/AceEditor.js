import React, {Component} from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/theme/monokai'
export default class Editor extends Component {
  render () {
    let {mode, onChange, value} = this.props
    return (
      <AceEditor
        theme="monokai"
        width="100%"
        height="100%"
        fontSize={14}
        tabSize={2}
        value={value}
        onChange={onChange}
        mode={mode}></AceEditor>
    )
  }
}
