import React, { Component } from 'react'
import API from 'src/api-config'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'
import { Link } from 'react-router'
import ListItem from 'components/ListItemStyle'

const md = new Remarkable({
  html: true,
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
class Article extends Component {
  state = {}
  componentDidMount() {
    let id = this.props.params.id
    API.Note.findById(id).then(({ data: article }) => {
      article.content = md.render(article.content || '暂时没有内容')
      this.setState({ show: true, data: article })
    })
  }
  render() {
    return (
      <ListItem.Content show={!!this.state.show} data={this.state.data} noClose={true} />
    )
  }
}
export default Article
