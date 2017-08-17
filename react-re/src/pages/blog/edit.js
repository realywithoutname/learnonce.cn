import React, { Component } from 'react'
import styled from 'styled-components'
import Editor from 'components/Editor'
import { Link, browserHistory } from 'react-router'
import API from 'src/api-config'
import puller from 'src/puller'
import Dialog from 'components/Dialog'
let EditContainer = styled.div`
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
  height: 100%;
`
let Header = styled.header`
  height: 64px;
  display: flex;
  flex-shrink: 0;
  background: #fff;
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
  width: 300px;
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
let Url = styled.div`
  width: 100%;
  height: 48px;
  padding: 8px;
  background: #eee;
  flex-shrink: 0;
  box-sizing: border-box;
  & input {
    border: none;
    height: 32px;
    line-height: 32px;
    outline: none;
    padding-left: 15px;
    box-sizing: border-box;
    font-size: 16px;
    width: 100%;
    color: #9a9a9a;
  }
`
let Description = styled.textarea`
  width: 100%;
  min-height: 200px;
  resize: none;
  outline: none;
  border: none;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
`
let Tags = styled.div`
  padding: 16px 0;
  display: flex;
  flex-wrap: wrap;
  & b {
    color: #999;
  }
  & input {
    outline: none;
    border: 1px dashed #eee;
    color: #333;
    width: 120px;
    padding-left: 8px;
    font-size: 14px;
  }
`
let Tag = styled.i`
  flex: auto 0 0;
  margin: 2px 2px 2px 0;
  padding: 2px 4px;
  box-sizing: border-box;
  border-radius: 4px;
  color: #9a9a9a;
  cursor: default;
  font-size: 14px;
  &.active {
    color: rgba(0,108,255,0.7);
  }
`
let SaveBtn = styled.div`
  text-align: center;
  margin-top: 16px;
  & button {
    border: 1px solid #ff9800;
    background: none;
    outline: none;
    padding: 4px 16px;
    color: #ff9800;
    border-radius: 4px;
    box-shadow: 0 0 4px 2px rgba(192, 192, 192, 0.2);
    &[disabled] {
      color: #1a1b2d;
      border: 1px solid #1a1b2d;
    }
  }
`
class Edit extends Component {
  state = { article: {}, isAuth: false }
  componentDidMount() {
    this.id = this.props.params && this.props.params.id
    if (this.id) {
      API.Note.findById(this.id).then(({ data: article }) => {
        let isAuth = puller.pull('auth')
        this.setState({ article, isAuth })
        if (!isAuth) {
          return puller.push('message', { message: '你没有权限进行该操作' })
        }
      }).catch(() => puller.push('message', { message: '获取文章详情失败' }))
    }
    API.Tag.find().then(({ data }) => {
      let isAuth = puller.pull('auth')
      this.setState({ tags: data, isAuth })
      if (!isAuth) {
        return puller.push('message', { message: '你没有权限进行该操作' })
      }
    }).catch(() => puller.push('message', { message: '获取标签失败' }))
    API.qiniu.token().then(({ data: token }) => {
      this.token = token
    })
  }
  change(e) {
    let content = e.target.value
    this.setState({ article: Object.assign({}, this.state.article, { content }) })
  }
  titleChange(e) {
    let title = e.target.value
    this.setState({ article: Object.assign({}, this.state.article, { title }) })
  }
  descriptionChange(e) {
    let description = e.target.value
    this.setState({ article: Object.assign({}, this.state.article, { description }) })
  }
  urlChange(e) {
    let sourceUrl = e.target.value
    this.setState({ article: Object.assign({}, this.state.article, { sourceUrl }) })
  }
  changeTran() {
    let translated = !!!this.state.article.translated
    this.setState({ article: Object.assign({}, this.state.article, { translated }) })
  }
  tagChange(e) {
    this.state.newTag = e.target.value
  }
  saveDialog(show) {
    this.setState({ show })
  }
  save() {
    let { article, newTag = '' } = this.state
    let tags = article.tags || ''
    if (newTag && tags.split(',').indexOf(newTag) === -1) {
      tags = (tags + ',' + newTag)
    }
    tags = tags.replace(/,,|，/g, ',').replace(/^[\s+]?,|,[\s+]?$|\s+/g, '')
    article.updateTime = new Date()
    delete article._id
    delete article.__v
    this.setState({ saveBtnDisabled: true })
    let q = this.id
      ? API.Note.updateById(this.id, Object.assign({}, article, { tags }))
        .then(() => {
          puller.push('message', { message: '更新文章成功' })
          this.saveDialog(false)
        })
        .catch(() => puller.push('message', { message: '更新文章失败' }))
      : API.Note.create(Object.assign({}, article, { createTime: new Date(), tags }))
        .then(({ data }) => {
          puller.push('message', { message: '新建文章成功' })
          this.saveDialog(false)
          browserHistory.push('/article/' + data._id)
        })
        .catch(() => puller.push('message', { message: '新建文章失败' }))
    q.then(() => this.setState({ saveBtnDisabled: false }))
  }
  selectTag(name) {
    let tags = this.state.article.tags || ''
    tags = tags.indexOf(name) !== -1 ? tags.replace(name, '') : tags + ',' + name
    this.setState({ article: Object.assign({}, this.state.article, { tags }) })
  }
  upload(e) {
    let file = e.target.files[0]
    if (file) {
      let form = new FormData()
      form.append('file', file)
      form.append('token', this.token.token)
      API.qiniu.upload(form).then(({ data }) => {
        let url = this.token.host + '/' + data.key
        let fileName = file.name
        let content = this.refs.Editor.setSelectionContent(`\n![${fileName}](${url})\n`)
        this.setState({ article: Object.assign({}, this.state.article, { content }) })
      })
    }
  }
  render() {
    let tags = (this.state.article.tags || '').split(',')
    if (!this.state.isAuth) {
      return null
    }
    return (
      <EditContainer>
        <Header>
          <Title>
            <input value={this.state.article.title || ''} onChange={this.titleChange.bind(this)} placeholder="标题" />
          </Title>
          <Icons>
            <Icon>clear</Icon>
            <Icon>image<input onChange={this.upload.bind(this)} type="file" accept="image/*" /></Icon>
            <Icon onClick={this.changeTran.bind(this)} className={this.state.article.translated && 'active'}>translate</Icon>
            <Icon onClick={this.saveDialog.bind(this, true)}>save</Icon>
            <Link to="/"><Icon>J</Icon></Link>
          </Icons>
        </Header>
        <Dialog show={this.state.show} close={this.saveDialog.bind(this, false)}>
          <Description value={this.state.article.description} onChange={this.descriptionChange.bind(this)} placeholder="摘要" />
          <Tags>
            <b>标签</b>
            {
              this.state.tags
                ? this.state.tags.map(
                  ({ name, _id: id }) => <Tag key={id}
                    className={tags.indexOf(name) !== -1 && 'active'}
                    onClick={this.selectTag.bind(this, name)}>{name}</Tag>
                )
                : null
            }
            <input placeholder="新标签" onChange={this.tagChange.bind(this)} />
          </Tags>
          <SaveBtn><button disabled={this.state.saveBtnDisabled} onClick={this.save.bind(this)}>确认保存</button></SaveBtn>
        </Dialog>
        <Editor ref="Editor" content={this.state.article.content || ''} change={this.change.bind(this)} />
        <Url>
          <input value={this.state.article.sourceUrl || ''} onChange={this.urlChange.bind(this)} placeholder="原文地址" />
        </Url>
      </EditContainer>
    )
  }
}

export default Edit