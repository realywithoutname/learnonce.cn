import React, {Component} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;

  & p, & li, & dd {
    font-size: 14px;
    color: rgba(0,0,0,0.87);
  }

  & h1 {
    font-size: 28px;
  }

  & h2 {
    font-size: 20px;
    color: rgba(0,0,0,0.9);
  }
  
  & h3 {
    font-size: 18px;
    color: rgba(0,0,0,0.9);
    font-weight: 300;
    margin: 12px 0;
  }
  a {
    color: #ff9800;
  }
`

const MyInfo = styled.section`
  display: flex;
  flex-flow: wrap;
  margin: 20px;
  & > div {
    flex: 1;
  }
  & p {
    font-size: 16px;
  }
  & > dl {
    flex: 1;
    text-align: right;
  }
  & > dl > dd, & > dl > dt {
    display: inline-block;
    line-height: 32px;
    height: 32px;
  }
  & > dl > dt {
    overflow: auto;
  }
  & > dl > dd {
    width: calc(100% - 70px);
    margin: 0;
    overflow: auto;
    color: #ff9800;
  }

`

const Icon = styled.i.attrs({
  className: 'material-icons'
}) `
  width: 32px;
  line-height: 32px;
  text-align: center;
  cursor: default;
  color: #2296f4;
  & img {
    width: 24px;
    height: 24px;
    line-height: 32px;
    color: #2296f4;
  }
`
const Abstract = styled.section`
  margin: 20px;
`
const Projects = styled.section`
  margin: 20px;
  & ul {
    list-style: none;
    padding: 0;
  }
  & .project-name {
    color: #777;
  }
  & .summary {
    color: #333;
  }
`

const TimeLine = styled.section`
  margin: 20px;
  & .time {
    color: #2296f4;
  }
`
class FE extends Component {
  render () {
    return (
      <Container>
        <MyInfo>
          <div>
            <h1>刘建东</h1>
            <p><Icon>room</Icon><span>杭州</span></p>
            <p>求职岗位：<b>前端工程师</b></p>
          </div>
          <dl>
            <dd>17764592171</dd>
            <dt>
              <Icon>phone</Icon>
            </dt>
            <dd><a href="mailto:hi@justsoso.me">hi@justsoso.me</a></dd>
            <dt>
              <Icon>email</Icon>
            </dt>
            <dd><a href="http://www.justsoso.me" target="_blank">www.justsoso.me</a></dd>
            <dt>
              <Icon>language</Icon>
            </dt>
            <dd><a href="https://github.com/realywithoutname" target="_blank">realywithoutname</a></dd>
            <dt><Icon><img src="/static/image/github.svg" /></Icon></dt>
          </dl>
        </MyInfo>
        <Abstract>
          <h2>个人简介</h2>
          <p>
            从2014年夏天接触web开发，3年+NodeJS和前端开发经验，技术涉猎广，偏向业务编程，注重需求的实现。
          </p>
          <p>
            在校期间带过团队，做过技术分享；工作期间，参与项目设计，技术选型，开发，测试，发布。
          </p>
          <p>
            掌握JavaScript，CSS 2/3，HTML 4/5，熟练应用Vue技术栈，React技术栈；熟悉NodeJS常用框架，webpack，git。
          </p>
        </Abstract>
        <Projects>
          <h2>项目经验</h2>
          <ul>
            <li>
              <h3><span className="project-name">store-admin</span> <span className="summary">多用户租车管理平台</span></h3>

              <p>
                该项目为共享单车多级别用户管理平台，该项目有我独立负责，基于对vue的熟悉以及生态等问题选择使用vue技术栈+element-ui作为项目基础，经历了差不多一年时间，到目前维护着102个组件。
                期间为了适应开发，经过三次大型重构，其中的原因包括更好的复用，更简洁的开发与维护，目录结构的调整。
              </p>

              <p>
                为了更好控制多用户权限控制，设计了基于ACL的多级路由生成器，对导航提供权限控制，子路由控制。减轻在业务程序中进行权限控制（页面内不同操作权限需要独立配置），理论上可实现无限级别的权限用户登陆和无限的路由层级。
              </p>

              <p>
                为了减少编写相同模式的代码，开发基于配置的表单生成组件和table生成组件。以基于数据生成的方式代替编码，使如表单，表格这样的需求完成变得简单快速，节约更多的时间关注业务实现。如一个过滤表单和一个表单组成的管理页面，HTML代码可能只需要几行。
              </p>
            </li>
            <li>
              <h3><span className="project-name">一动出行 APP</span> <span className="summary">微信小程序租车客户端</span></h3>
              <p>
                该项目是公司运营的微信小程序，我在其中负责前期开发，后期由新同事完成。
              </p>
              <p>
                最初小程序发布时，IDE语法高亮，自动提示不完善，es6不支持给开发带来很多不便。为了更好的开发体验使用rollup开发了小程序的脚手架，自动生成小程序特有的目录结构，以及生成基本小程序模版。完成html，css，es6到wxml，wxss，es5的转换。
              </p>

              <p>
                封装如request，modal，toast等常用API，提供Promise使用方式，request API为了更方便的管理后端接口，提供和axios一样的使用方式，如通过方法或resource方式使用；导航API，封装为vue-router一样的使用方式；对地图组件封装了常用的和高德地图相似的API。
              </p>
            </li>
            <li>
              <h3><span className="project-name"><a href="http://www.justsoso.me" target="_blank">Just soso</a></span> <span className="summary">个人博客</span></h3>
              <p>
                该作品后端使用Koa.js，前端使用vue.js，后来使用React.js进行重构。
              </p>
              <p>
                网站使用RSS聚合网络信息，无限加载，HTML5离线缓存，浏览器指纹等方式减少数据加载时间以及身份验证。
              </p>
            </li>
            <li>
              <h3><span className="project-name"><a href="https://github.com/realywithoutname/decorator-doc" target="_blank">decorator-doc</a></span> <span className="summary">NodeJS swagger.json生成器</span></h3>
              <p>
                基于Swagger规范以及ES7 Decorator语法编写的一个swagger文档生成器，集成了swagger-ui，验证，路由等功能，支持在koa1.x，koa2.x以及基于connnect的Node.js框架。
              </p>
              <p>
                支持ES7 Decorator语法以及使用基于JSON文档两种使用方式。目前正在公司内部使用。
              </p>
            </li>
          </ul>
        </Projects>
        <TimeLine>
          <h2>教育与工作</h2>
          <p><a>杭州电子科技大学</a> 网络工程 <span className="time">2013.9 - 2017.7</span></p>
          <p><a>深圳林晨展华(杭州)科技有限公司</a> web前端工程师 <span className="time">2016.4 - 至今</span></p>
        </TimeLine>
      </Container>
    )
  }
}

export default FE