import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, browserHistory } from 'react-router'
import Editor from './Editor'
import API from 'src/api-config'
import puller from 'src/puller'
import DemoFrame from 'pages/demo/demo'

const winWidth = window.innerWidth
const IDEContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`
let Header = styled.header`
  height: 64px;
  display: flex;
  flex-shrink: 0;
  background: #fff;
  border-bottom: 1px solid #f6f6f6;
`
let Title = styled.div`
  flex: 1;
  margin-right: 24px;
  & input {
    width: 100%;
    height: 100%;
    border: 0;
    outline: none;
    padding-left: 16px;
    font-size: 24px;
    color: #333;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.58), rgba(255, 255, 255, 0));
  }
`
let Icons = styled.div`
  color: #333;
  width: 186px;
  padding: 8px;
  box-sizing: border-box;
`
let Icon = styled.i.attrs({
  className: 'material-icons'
}) `
  color: rgba(119, 119, 119, 0.55);
  width: 48px;
  line-height: 48px;
  text-align: center;
  cursor: default;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
  position: relative;
  &:last-child {
    background: #1a1b2d;
    color: #ff9800;
    border-radius: 48px;
  }
  &.active, &:nth-last-child(2) {
    font-weight: 100;
    color: rgba(0, 108, 255, 0.82);
  }
  & input {
    border: none;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    opacity: 0;
    top: 0;
    z-index: 1;
  }
`
const IDEAnima = styled.div`
  transition: left ease-in-out .5s;
`
const IDEPreview = IDEAnima.extend`
  position: fixed;
  top: 64px;
  width: 100%;
  left: ${winWidth}px;
  height: calc(100% - 64px);
  background: #f1f1f1;
  &.viewer {
    left: 0;
  }
`

const IDEEditor = IDEAnima.extend`
  width: 100%;
  flex: 1;
  display: flex;
  position: relative;
  left: 0;
  &.viewer {
    left: -${winWidth}px;
  }
`
class IDE extends Component {
  constructor(props) {
    super()
    this.id = props.params.id
    this.state = { isAuth: puller.pull('auth'), show: !!props.route.path.match(/demo/) }
  }
  componentDidMount() {
    this.id && this.load(this.id)
  }
  load(id) {
    API.Demo.findById(id).then(({ data: { title, html, css, script, _id } }) => this.setState({ title, html, css, script, _id }))
      .then(() => this.setState({ isAuth: puller.pull('auth') }))
  }
  save() {
    let { title, html, css, script, _id } = this.state
    let data = { title, html, css, script, updateTime: new Date() }
    let req = _id ? API.Demo.updateById(_id, data) : API.Demo.create(Object.assign({}, data, { createTime: new Date() }))
    req.then(({ data }) => _id ? puller.push('message', '更新成功') : browserHistory.push('/IDE/' + data._id))
      .catch(() => puller.push('message', _id ? '更新' : '创建' + '失败'))
      .then(() => this.setState({ saving: false }))
  }
  run() {
    this.setState({ show: !this.state.show })
  }
  titleChange(e) {
    this.setState({ title: e.target.value })
  }
  render() {
    return (
      <IDEContainer >
        <Header>
          <Title>
            <input readOnly={!this.state.isAuth} value={this.state.title || ''} onChange={this.titleChange.bind(this)} placeholder="标题" />
          </Title>
          <Icons>
            <Icon play={true} onClick={this.run.bind(this)}>{this.state.show ? 'pause' : 'play_arrow'}</Icon>
            {this.state.isAuth ? <Icon onClick={this.save.bind(this, true)}>save</Icon> : <Icon></Icon>}
            <Link to="/"><Icon>J</Icon></Link>
          </Icons>
        </Header>
        <IDEEditor onKeyDown={(e) => {
          if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault()
            this.save()
          }
        }} className={this.state.show ? 'viewer' : 'editor'}>
          <Editor mode="html" value={this.state.html} read={!this.state.isAuth} onChange={(text) => {
            this.setState({ html: text })
          }} />
          <Editor mode="css" value={this.state.css} read={!this.state.isAuth} onChange={(text) => {
            this.setState({ css: text })
          }} />
          <Editor mode="javascript" value={this.state.script} read={!this.state.isAuth} onChange={(text) => {
            this.setState({ script: text })
          }} />
        </IDEEditor>
        <IDEPreview className={this.state.show ? 'viewer' : 'editor'}>
          <DemoFrame ref="viewer" show={this.state.show || this.state.saving} html={this.state.html} css={this.state.css} script={this.state.script} />
        </IDEPreview>
      </IDEContainer>
    )
  }
}
export default IDE
