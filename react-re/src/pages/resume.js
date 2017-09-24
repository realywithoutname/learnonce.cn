import React, {Component} from 'react'
import style from 'styles/resume.css'

class Resume extends Component {
  render () {
    return (
      <div className={style.container}>
        <div className={style.baseInfo}>
          <div className={style.chat}>
            <div>RESUME</div>
            <img src="/static/image/wechat.png" />
            <a className={style.download} download="刘建东简历(Web前端开发工程师).pdf" href="/static/resume.pdf">
              PDF
            </a>
          </div>
          <div className={style.myInfo}>
            <div className={style.info}>
              <h2 className={style.title}>个人信息</h2>
              <div className={style.item}>
                <i className={`material-icons ${style.icon}`}>account_box</i>
                <span>刘建东</span>
              </div>
              <div className={style.item}>
                <i className={`material-icons ${style.icon}`}>account_balance</i>
                <span>杭州电子科技大学</span>
              </div>
              <div className={style.item}>
                <i className={`material-icons ${style.icon}`}>call</i>
                <span>17764592171</span>
              </div>
              <div className={style.item}>
                <i className={`material-icons ${style.icon}`}>email</i>
                <a style={{color: '#717171'}} target="_blank" href="mailto:hi@justsoso.me"><span>hi@justsoso.me</span></a>
              </div>
              <div className={style.item}>
                <i className={`material-icons ${style.icon}`}>location_on</i>
                <span>杭州</span>
              </div>
              <div className={`print-show ${style.item}`}>
                <i className={`material-icons ${style.icon}`}>W</i>
                <a style={{color: '#717171'}} target="_blank" href="http://www.justsoso.me"> <span>www.justsoso.me</span></a>
              </div>
              <div className={`print-show ${style.item}`}>
                <i className={`material-icons ${style.icon}`}>G</i>
                <a style={{color: '#717171'}} target="_blank" href="https://github.com/realywithoutname"><span>github.com/realywithoutname</span></a>
              </div>
              <div className={`print-show ${style.item}`}>
                <i className={`material-icons ${style.icon}`}>M</i>
                <span>编程是为了解决问题</span>
              </div>
            </div>
            <div className={style.kills}>
              <div className={style.comment}>
                <h2 className={style.title}>个人评价</h2>
                <div>生活放荡不羁；技术“博”而不精；热爱JavaScript；追求代码美感。</div>
              </div>
              <h2 className={style.title}>常用技术与框架</h2>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>HTML</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>CSS</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>JavaScript</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>MySql</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>MongoDB</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>Node.js</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>vue.js</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>React.js</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>Express.js</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>Koa.js</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>Git</i>
                </span>
              </div>
              <div className={style.item}>
                <span>
                  <i className={style.icon}>webpack</i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.workInfo}>
          <div className={style.experience}>
            <div>
              <h2 className={style.title}>工作经历</h2>
              <dl className={style.worklist}>
                <dt>
                  <p className={style.time}>2016.4-至今</p><p className={style.company}>深圳林晨展华科技有限公司</p>
                </dt>
                <dd className={`markdown-body ${style.content}`}>
                  <ul>
                    <li>工作描述：
                    参与多个项目开发，其中有维护老项目，带新人开发新项目，也有独立负责的项目。工作内容包括自动化构建，目录结构设计，
                    代码结构设计，组件设计与编码，代码审查与重构。当然做的最多的还是编写业务代码。
                    </li>
                    <li>
                      <p className={style.title}>车辆防盗管理系统</p>
                      <p>我在其中主要负责车辆在地图的显示，如果有什么值得提的，估计就是优化了地图由于一次从后端查询的数据太多，导致浏览器崩溃的问题。</p>
                    </li>
                    <li>
                      <p className={style.title}>学生卡家长版web应用</p>
                      <p>负责带一名新人做前端开发，前期做一些基础的开发规范，webpack的应用，然后就开发，测试，上线。</p>
                    </li>
                    <li>
                      <p className={style.title}>共享单车管理系统</p>
                      <p>该项目是今年公司的主要项目，我负责管理系统的独立开发，后期有新同事加入，其中我觉得有意义的
                      是其中几个重要组件：基于ACL的多级路由组件，基于配置的表单组件，基于Swagger.js的前后端数据分离，
                      当然更重要的是组件化开发思想，效果如下：
                        <ul>
                          <li>提高页面开发速度。常规管理页面，增删改查开发不超过半小时。一份JSON文档，两个表单组件，一个表格组件。足以满足常规需求。</li>
                          <li>降低页面负责度。页面可通过不同组件搭配，如在表单组件添加时间选择组件，地区选择组件，页面添加Excel导出等，都可通过组件间的搭配满足需求。</li>
                          <li>组件间低耦合。组件功能尽量单一，提供尽量简单的接口，完成组件应该完成的功能。</li>
                        </ul>
                      </p>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
          <div className={style.programme}>
            <div>
              <h2 className={style.title}>开发项目</h2>
              <dl className={style.worklist}>
                <dt>
                  <p className={style.time}>2014.7-2015.9</p>
                  <p className={style.company}>团团一家</p>
                </dt>
                <dd>
                  <p className={style.content}>
                    校园活动平台——使用互联网技术为活动组织者提供活动解决方案，为活动主办方提供信息发布，推广，报名，抢票，投票，抽奖，数据统计等一系列服务的Web服务应用.
                    <br/>
                    第一版本中本人负责其中微信接口的开发，如活动推送，自动回复，客户信息，扫码登录等等功能。该项目作为人生第一次大型项目，并在校园内获得全校师生认可的项目。
                    后期使用Node.js/Strongloop，MongoDB，Angular.js重构。负责带领团队，以及部分前端开发。
                    RESTful接口设计，以及如何实现更好的前后端分离留下了深刻映像，并在后来工作的公司成功推荐使用Swagger.js。
                  </p>
                </dd>
              </dl>
              <dl className={style.worklist}>
                <dt>
                  <p className={style.time}>2015.10-2016.01</p><p className={style.company}>Where&nbsp;RU</p>
                </dt>
                <dd>
                  <p className={style.content}>
                    设想解决的校园内发掘人才解决方案。在校园服务平台基础上添加社交属性——圈子，能力反应模块——竞赛。期望通过学生在校参与竞赛，圈子社交等信息，挖掘并整理分析学生能力，面向实验室，学校，企业等用人处提供学生信息，面向学生提供大学轨迹档案。我在项目中作为负责人，带领团队开发以及参与2016全国大学生创业大赛，获校赛金奖。
                  </p>
                </dd>
              </dl>
              <dl className={style.worklist}>
                <dt>
                  <p className={style.time}>2016.7-2017.01</p><p className={style.company}>个人博客</p>
                </dt>
                <dd>
                  <p className={style.content}>
                    该作品后端使用Koa.js，前端使用vue.js，后来使用React.js进行重构，该作品使用RSS聚合网络信息，使用前后端分离技术解决每天停留在互联网查看信息的时间，该网站使用持续加载，HTML5离线缓存，浏览器指纹等方式减少数据加载时间以及身份验证。在该作品把加载一篇文章所需时间尽量控制在1s内，实际使用中基本感觉不到加载时间。最终该作品作为本人毕业设计《响应式web博客系统设计》作品，获得优秀毕业设计。
                  </p>
                </dd>
              </dl>
              <dl className={style.worklist}>
                <dt>
                  <p className={style.time}>2017.8.22-现在</p><p className={style.company}>
                    <a href="https://github.com/realywithoutname/decorator-doc">decorator-doc</a>
                  </p>
                </dt>
                <dd>
                  <p className={style.content}>
                    基于Swagger规范以及ES7 Decorator语法编写的一个swagger文档生成器，集成了swagger-ui，验证等功能，支持在koa1.x，koa2.x以及基于connnect的Node.js框架，
                    支持ES7 Decorator语法以及使用基于JSON文档两种使用方式。目前正在公司内部使用，找bug。
                  </p>
                </dd>
              </dl>
              <dl className={style.worklist}>
                <dt>
                  <p className={style.time}>2017.9.01-现在</p><p className={style.company}>
                    <a href="https://github.com/realywithoutname/ECMAScript">ECMAScript® 2018 中文翻译</a>
                  </p>
                </dt>
                <dd>
                  <p className={style.content}>
                    因为ECMA文档现在完全通过github维护，所以我认为维护一份中文版本的规范文档是有意义的，目前已翻译到第七章，在翻译过程中让很多理解更加通透了。希望可以造福更多的中国开发者。
                  </p>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Resume
