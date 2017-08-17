import React, { Component } from 'react'
import styled from 'styled-components'

const DialogContainer = styled.div`
  z-index: ${props => props.show ? 1 : -1};
  opacity: ${props => props.show ? 1 : 0};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity ease-in-out 0.2s;
`
const DialogContent = styled.div`
  background: #fff;
  position: absolute;
  width: 500px;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  min-height: 300px;
  box-shadow: 0 2px 4px 2px rgba(142,142,142,0.4);
  border-radius: 4px;
  z-index: 2;
  padding: 24px;
  box-sizing: border-box;
`

const Mask = DialogContainer.extend`
  background: rgba(255, 255, 255, 0.5);
  z-index: 1;
  display: block;
`

const Close = styled.i.attrs({
  className: 'material-icons'
}) `
  position: absolute;
  right: 2px;
  top: 2px;
  cursor: default;
  &:hover {
    color: rgba(0,108,255,0.82);
  }
`
class Dialog extends Component {
  render() {
    let { show, close } = this.props
    return (
      <DialogContainer show={show}>
        <Mask onClick={close} />
        <DialogContent>
          <Close onClick={close}>clear</Close>
          {this.props.children}
        </DialogContent>
      </DialogContainer>
    )
  }
}

export default Dialog