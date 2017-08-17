import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 64px;
  margin: 32px auto;
  color: #1a1b2d;
  font-size: 16px;
  width: 100%;
  text-align: center;
  line-height: 64px;
  display: ${props => props.isEnd ? '' : 'none'};
  &::before {
    content: '';
    width: calc(50% - 40px);
    display: inline-block;
    transform: translateY(-4px);
    margin-right: 8px;
    border-top: 1px solid #1a1b2d;
  }
  &::after {
    content: '';
    width: calc(50% - 40px);
    display: inline-block;
    margin-left: 8px;
    transform: translateY(-4px);
    border-top: 1px solid #1a1b2d;
  }
`

class EndBootom extends Component {
  render() {
    return (
      <Container isEnd={this.props.isEnd} >
        这是底线
      </Container>
    )
  }
}

export default EndBootom