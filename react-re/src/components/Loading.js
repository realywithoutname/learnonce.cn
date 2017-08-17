import React, {Component} from 'react'
import styled, {keyframes} from 'styled-components'

const rotate360 = keyframes`
	from {
    transform: rotate(0deg);
    color: #ca3d3d;
	}
  50% {
    transform: rotate(180deg);
    color: #ff9800;
  }
	to {
    transform: rotate(360deg);
    color: #1a1b2d;
	}
`;

const Container = styled.div`
  width: 64px;
  height: 64px;
  margin: 32px auto;
  display: ${props => props.loading ? '' : 'none'};
  i {
    opacity: 0.8;
    height: 100%;
    width: 100%;
    font-size: 64px;
    color: #ff9800;
    animation: ${rotate360} 1s linear infinite;
  }
`
class Loading extends Component {
  render () {
    return (
      <Container loading={this.props.loading}>
        <i className="material-icons">autorenew</i>
      </Container>
    )
  }
}

export default Loading