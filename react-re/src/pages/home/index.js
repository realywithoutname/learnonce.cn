import React, { Component } from 'react'
import styled from 'styled-components'


import Nav from './Nav'
import Back from './Back'
import puller from 'src/puller'
import Wrapper from './Wrapper'
import Fingerprint from 'static/fingerprint'

let finger = new Fingerprint({ canvas: true }).get()

const Frame = styled.div`
  background: #f1f1f1;
  height: 100%;
  width: 100%;
`
const View = styled.section`
  position: absolute;
  top: 100%;
  width: 100%;
  left: 0;
  background: #f1f1f1;
  height: 100%;
  @media (max-width: 640px) {
    top: 0;
  }
`

const Page = styled.div`
  display: flex;
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
  overflow: hidden;
`

class Home extends Component {
  state = { isAuth: puller.pull('auth') }
  render() {
    return (
      <Frame>
        <Back />
        <Wrapper />
        <View>
          <Page>
            <Nav isAuth={this.state.isAuth} finger={finger} />
            {this.props.children}
          </Page>
        </View>
      </Frame>
    )
  }
}

export default Home
