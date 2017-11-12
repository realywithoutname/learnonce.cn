import React, {Component} from 'react'
import styled from 'styled-components'

const CardContainer = styled.div.attrs({
  className: 'card'
})`
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);
  background: #fff;
  padding: 0 24px;
  box-sizing: border-box;
  margin-top: 8px;
  padding-bottom: 16px;
  & h2 {
    margin: 0;
    height: 48px;
    line-height: 48px;
    font-size: 20px;
    color: rgba(0,0,0,0.9);
  }
  & .card {
    margin: 8px -18px;
    box-shadow: none;
    padding-bottom: 0;
  }
  & .card h2 {
    font-size: 16px;
    height: 36px;
    line-height: 36px;
  }
`
export default class Card extends Component {
  render () {
    return (
      <CardContainer>
        <h2>{this.props.src ? (<a href={this.props.src}>{this.props.title}</a>) : this.props.title}</h2>
        {
          this.props.children
        }
      </CardContainer>
    )
  }
}