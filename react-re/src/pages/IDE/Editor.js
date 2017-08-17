import React, { Component } from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/mode/html'
import 'brace/mode/css'
import 'brace/theme/tomorrow'
export default class Editor extends Component {
  render() {
    let { value, read, onChange, mode = 'javascript' } = this.props
    return (
      <AceEditor
        theme="tomorrow"
        width="100%"
        height="100%"
        fontSize={14}
        tabSize={2}
        value={value}
        onChange={onChange}
        readOnly={read}
        setOptions={{
          showLineNumbers: false
        }}
        editorProps={{ $blockScrolling: true }}
        mode={mode}></AceEditor>
    )
  }
}