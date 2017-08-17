import React, { Component } from 'react'
import styled from 'styled-components'
// import html2canvas from 'html2canvas'

const DemoContainer = styled.iframe`
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  overflow: hidden;
  border: none;
`

export default class extends Component {
  state = {}
  insertDoc(el) {
    this.iframe = el
  }
  // getPicUrl() {
  //   return html2canvas(this.iframe)
  //     .then(canvas => canvas.toDataURL('image/png'))
  //     .then((image) => {
  //       console.log(image)
  //     })

  // }
  componentDidUpdate() {
    let { html, css, script } = this.props
    let el = this.iframe
    if (!el) return
    setTimeout(() => {
      el.contentDocument.open()
      el.contentDocument.write(`
        ${html}
        <style>body {height: 100%;width: 100%; background: #f1f1f1; margin: 0} ${css}</style>
        <script src="/static/console.js"></script>
        <script>
          try {
            ${script}
            console.log(2)
          } catch (e) {
            postMessage(e)
            console.log(1)
          }
        </script>
      `)
    }, 0)
  }
  render() {
    let { show } = this.props

    return show ? (
      <DemoContainer innerRef={this.insertDoc.bind(this)} />
    ) : null
  }
}