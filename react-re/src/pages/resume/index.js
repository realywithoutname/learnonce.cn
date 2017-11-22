import React, {Component} from 'react'
import styled from 'styled-components'
import Card from './card'

const Container = styled.div`
  // background: #f1f1f1;
  padding: 100px 0;
  min-height: 100%;
  box-sizing: border-box;
  @media (max-width: 700px) {
    padding: 0;
  }
`

const Banner = styled.div`
  background: #2296f4;
  height: 300px;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: -1;
`
const Content = styled.div`
  margin: 0 auto;
  max-width: 820px;
  background: #fff;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

const Header = styled.header`
  height: 310px;
  background: #E91E63;
  color: #fff;
  box-sizing: border-box;
  padding: 100px 20px;
  background-image: url(/static/image/bg.png);
  background-size: 100%;
  background-position: 0px -300px;
  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);
  & h1 {
    font-size: 24px;
    margin-top: 56px;
  }
  & p {
    font-size: 16px;
    font-weight: 100;
  }
`
const Column = styled.section`
  width: ${props => props.percent || 50}%;
  display: inline-block;
  box-sizing: border-box;
  ${props => props.left ? 'padding-left:' + props.left + 'px' : ''};
  float: left;
  // @media (max-width: 700px) {
  //   width: 100%;
  //   padding-left: 0;
  // }
  & dl {
    margin: 0;
  }
  & p, & li, & dd {
    font-size: 14px;
    color: rgba(0,0,0,0.87);
  }
  & ul {
    padding-left: 16px;
  }
  & li {
    margin-top: 8px;
  }
  & p {
    text-indent:2em;
  }
  & dt, & dd {
    display: inline-block;
    height: 36px;
    line-height: 36px;
  }
  & dt {
    width: 70px;
    color: rgba(0,0,0,0.54);
  }

  & dd {
    width: calc(100% - 70px);
    margin: 0;
  }

  & a {
    color: #ff9800;
  }

  // & b {
  //   color: #F44336;
  // }
`

class Resume extends Component {
  render () {
    return (
      <Container>
        <Banner></Banner>
        <Content>
          <Header>
            <h1>刘建东</h1>
            <p>生活放荡不羁；技术“博”而不精；热爱JavaScript；追求代码美感。</p>
          </Header>
          <Column percent="60">
            <Card title="简要介绍">
              <p>
                从2014年夏天接触web开发，现主攻前端开发，3年+NodeJS和前端开发经验，技术涉猎广，偏向业务编程，注重需求的实现，弱点在于UI和交互上的细节。
              </p>
              <p>
                在校期间带过团队，做过技术分享；从2016年工作以来一直呆在一个公司，参与项目设计，技术选型，开发，测试，发布，团队一直利用最新的技术开发项目。
              </p>
              <p>
                熟悉NodeJS常用框架，MySQL，MongoDB，PgSQL数据库，Vue技术栈，React技术栈以及webpack，git等工具。<br />
              </p>
              <p>
              </p>
            </Card>
            <Card title="工作经历 2016.04.01-至今">
              <p>
                从2016年4月开始职业生涯，一直就职于<b>深圳林晨展华(杭州)科技有限公司</b>，期间参与多个项目开发与落实。其中有维护老项目，带新人开发新项目，也有独立负责的项目。工作内容包括自动化构建，目录结构设计， 代码结构设计，组件设计与编码，代码审查与重构。
                <b>介绍以下两个能够体现价值的项目。</b>
              </p>
              <Card title="租车管理平台项目 独立负责">
                <p>
                  基于对vue的熟悉以及生态等问题选择使用<b>vue技术栈</b>+<b>element-ui</b>作为基础，到目前为止维护着30+个页面，20+个组件。经过<b>三次大型重构</b>，其中的原因包括更好的复用，更简洁的开发与维护，目录结构的调整。
                  <br />
                  <br />
                  <b>以下是个人认为做得比较满意的细节：</b>
                </p>
                <ul>
                  <li>
                    基于ACL的多级路由:路由生成器。提供权限设置，路由配置，子路由设置等接口。理论上可实现无限级别的权限用户登陆和无限的路由层级。
                  </li>
                  <li>
                    基于配置的表单组件：表单生成组件。基于element-ui基础表单组件封装，提供一个submit事件，form参数接口。form参数通过JSON文档配置表单元素，验证等信息生成完整的表单，验证输入。用很少的代码实现复杂的表单，局限是不能够对表单进行灵活的控制。
                  </li>
                  <li>
                    组件化开发思想：提高页面开发速度，降低页面负责度，组件间低耦合。
                  </li>
                </ul>
              </Card>
              <Card title="微信小程序 基础设施建设">
                <ul>
                  <li>
                    开发环境支持: 最初小程序发布时，IDE语法高亮，自动提示不完善，es6不支持给开发带来很多不便。使用rollup开发了小程序的脚手架，自动生成小程序特有的目录结构，以及生成基本小程序模版，html，css到wxml，wxss的转换。
                  </li>
                  <li>
                    Request API封装：小程序提供的request API对于开发和惯用的如axios这样的工具大相径庭，为了更好更方便的开发，封装了和axios一样的使用方式，如通过方法或resource方式使用。
                  </li>
                  <li>
                    其他基础插件：对于很多常用的API也进行了封装，如交互API，toast，modal封装提供promise方式使用，导航API，封装为vue-router一样的使用方式；对地图组件封装了常用的和高德地图相似的API。
                  </li>
                </ul>
              </Card>
            </Card>
          </Column>
          <Column percent="40" left="8">
            <Card title="基本资料">
              <dl>
                <dt>性别</dt>
                <dd>男</dd>
                <dt>坐标</dt>
                <dd>杭州</dd>
                <dt>电话</dt>
                <dd>17764592171</dd>
                <dt>学校</dt>
                <dd>杭州电子科技大学</dd>
                <dt>专业</dt>
                <dd>网络工程</dd>
                <dt>邮箱</dt>
                <dd><a href="mailto:hi@justsoso.me">hi@justsoso.me</a></dd>
                <dt>网站</dt>
                <dd><a href="www.justsoso.me" target="_blank">www.justsoso.me</a></dd>
                <dt>github</dt>
                <dd><a href="https://github.com/realywithoutname" target="_blank">realywithoutname</a></dd>
                <dt>编程理念</dt>
                <dd>编程是为了解决问题</dd>
              </dl>
            </Card>
            <Card title="团团一家校园活动服务平台">
              <p>
                使用互联网技术为活动组织者提供活动解决方案，为活动主办方提供信息发布，推广，报名，抢票，投票，抽奖，数据统计等一系列服务的Web服务应用.
              </p>
              <p>
                第一版使用PHP，MySql，Jquery；第二版使用NodeJS/StrongLoop，MongoDB，AngularJS开发。在项目中主要负责后端开发。
              </p>
            </Card>
            <Card title="JustSoSo个人博客" src="http://www.justsoso.me">
              <p>
                该作品后端使用Koa.js，前端使用vue.js，后来使用React.js进行重构。
              </p>
              <p>
                网站使用RSS聚合网络信息，无限加载，HTML5离线缓存，浏览器指纹等方式减少数据加载时间以及身份验证。
              </p>
            </Card>
            <Card title="decorator-doc" src="https://github.com/realywithoutname/decorator-doc">
              <p>
                基于Swagger规范以及ES7 Decorator语法编写的一个swagger文档生成器，集成了swagger-ui，验证等功能，支持在koa1.x，koa2.x以及基于connnect的Node.js框架。
              </p>
              <p>
                支持ES7 Decorator语法以及使用基于JSON文档两种使用方式。目前正在公司内部使用。
              </p>
            </Card>
            <Card title="翻译项目">
              <a href="http://www.justsoso.me/blog/58dd23ebcc11fd66b05d5a43">fetch(未完成)</a><br />
              <a href="http://www.justsoso.me/blog/58ce6434d306ed453d87de1e">XMLHttpRequest</a><br />
              <a href="https://github.com/realywithoutname/ECMAScript">ECMAScript® 2018 Language Specification(未完成)</a>
            </Card>
          </Column>
        </Content>
      </Container>
    )
  }
}

export default Resume