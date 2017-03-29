import React, {Component} from 'react'
import { connect } from 'react-redux'
import {fetchArticleContent} from 'src/redux/actions'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'
import {Link} from 'react-router'
const md = new Remarkable({
  highlight: function (code, lang) {
    return hljs.highlightAuto(code, [lang]).value
  }
})
import * as style from 'styles/article.css'
class Article extends Component {
  componentDidMount () {
    let {params, dispatch} = this.props
    dispatch(fetchArticleContent(params.id))
  }
  render () {
    let {params, article, scroll} = this.props
    let post = article.data[params.id] || {}
    return (
      <article className={`${scroll.direction && 'scroll-bottom'} ${style.detail}`}>
        <header>
          <Link to={`/${params.splat}`}>{params.splat}</Link>
          <h1>{post.title}</h1>
        </header>
        <section>
          <div className={style.summary}>{post.description}</div>
          <div className="markdown-body"
          dangerouslySetInnerHTML={
            {__html: (md.render(post && post.content))}
          }></div>
        </section>
      </article>
    )
  }
}
export default connect((state) => ({
  article: state.articles,
  scroll: state.scroll
}))(Article)
