import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'
const Item = styled.li`
  background: #fff;
  padding: 8px 16px;
  box-sizing: border-box;
  margin-top: 8px;
`


class ListItem extends Component {
  render() {
    return (
      <Item onClick={this.props.onClick}>
        {this.props.children}
      </Item>
    )
  }
}

const Header = styled.h2`
  font-size: 16px;
  letter-spacing: 1px;
  cursor: default;
  position: relative;
  & > a {
    display: block;
    color: #ca3d3d;
  }
  & > a:hover {
    color: rgb(255, 152, 0);
  }
`

ListItem.Header = class extends Component {
  render() {
    return (
      <Header>
        {this.props.children}
      </Header>
    )
  }
}

const Description = styled.p`
  color: #1a1b2d;
  line-height: 1.5;
  cursor: default;
`

ListItem.Description = class extends Component {
  render() {
    return (
      <Description className="markdown-body" dangerouslySetInnerHTML={{ __html: this.props.content }} />
    )
  }
}

const Article = styled.article`
  position: ${props => props.show ? 'fixed' : 'relative'};
  top: ${props => props.show ? 0 : '50%'};
  left: ${props => props.show ? 0 : '50%'};
  width: ${props => props.show ? '100%' : 0};
  height:${props => props.show ? '100%' : 0};
  background: #fff;
  z-index: 1;
  overflow: auto;
  background: #f1f1f1;
  transition: all ease .5s;
  & header {
    position: fixed;
    top: ${props => props.show ? 0 : '50%'};
    width: 100%;
    display: flex;
    box-shadow: 0 3px 6px 3px rgba(142, 142, 142, 0.6);
    background: #fff;
    & h2 {
      flex: 1;
      margin: 0;
      padding: 0;
      line-height: 64px;
      padding-left: 16px;
    }
    & i {
      width: 64px;
      height: 64px;
      line-height: 64px;
      text-align: center;
      cursor: default;
    }
  }
`
const Content = styled.div`
  max-width: 720px;
  margin: 128px auto;
  background: #fff;
  padding: 48px 16px;
  box-sizing: border-box;
  & a {
    color: rgb(255, 152, 0);
  }
`

let Icon = styled.i.attrs({
  className: 'material-icons'
}) `
  width: 48px;
  line-height: 48px;
  text-align: center;
  cursor: default;
  &.icon {
    background: #ca3d3d;
    color: #ff9800;
    border-radius: 48px;
    margin-right: 16px;
  }
`

ListItem.Content = class extends Component {
  render() {
    let { data, show, close, noClose } = this.props
    if (!show) {
      return <Article show={false} />
    }
    return (
      <Article onScroll={e => {
        e.stopPropagation()
      }} show={true}>
        <header>
          <h2>{data.title}</h2>
          {
            !noClose
              ? <Icon onClick={e => !e.stopPropagation() && close.call(null, e)} className="material-icons">clear</Icon>
              : <Link to="/"><Icon className="icon">J</Icon></Link>
          }
        </header>
        <Content className="markdown-body" dangerouslySetInnerHTML={{ __html: data.content }}>
        </Content>
      </Article>
    )
  }
}

const Footer = styled.p`
  color: #1a1b2d;
`

ListItem.Footer = class extends Component {
  render() {
    return (
      <Footer>{this.props.children}</Footer>
    )
  }
}
export default ListItem