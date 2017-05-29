import React, {Component} from 'react'
import { connect } from 'react-redux'
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
                <span>hi@justsoso.me</span>
              </div>
              <div className={style.item}>
                <i className={`material-icons ${style.icon}`}>location_on</i>
                <span>杭州</span>
              </div>
              <div className={`print-show ${style.item}`}>
                <i className={`material-icons ${style.icon}`}>W</i>
                <span>www.justsoso.me</span>
              </div>
              <div className={`print-show ${style.item}`}>
                <i className={`material-icons ${style.icon}`}>M</i>
                <span>编程是为了解决问题</span>
              </div>
            </div>
            <div className={style.kills}>
              <h2 className={style.title}>专业技能</h2>
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
                  <p className={style.title}>车辆防盗管理系统</p>
                  <ul>
                    <li>工作描述：
                    管理平台使用vue.js 1.x，服务号使用Angular.js 1.x，在项目中主要负责在原有项目中新功能的开发。</li>
                    <li>工作成果：
                      <ul>
                        <li>感谢vue.js的通俗的文档，以及vue.js自身使用上的简单，在几天时间的掌握使用vue.js进行项目开发，以及组件编写。</li>
                        <li>开发了灵活的地图组件，组件对不同的地图API厂商提供同一套API，根据配置信息自动使用不同的地图组件。</li>
                      </ul>
                    </li>
                  </ul>
                  <hr />
                  <p className={style.title}>家校云-学生卡家长版web应用</p>
                  <ul>
                  <li>工作描述：
                  在项目中作为前端负责人，负责带一名刚入前端的同事，任务划分，前端自动化配置，部分功能开发。（原来的前端开发者大神写后端了）</li>
                  <li>工作成果：
                  <ul>
                  <li>熟练使用vue.js，掌握其基本运行原理。</li>
                  <li>带领新人，在接下来的项目中可是基于vue.js独立开发</li>
                  </ul></li>
                  </ul>
                  <hr />
                  <p className={style.title}>共享单车管理系统</p>
                  <ul>
                  <li>工作描述：
                  系统使用vue.js 2.0开发，本人负责管理后台的开发，并做了以下我觉得有意义的工作
                  <ul>
                  <li>设计前端权限配置，以及ACL</li>
                  <li>设计基于配置的表单组件</li>
                  <li>使用基于Swagger.js的前后端数据分离</li>
                  <li>系统组件与功能的开发</li>
                  </ul></li>
                  <li>工作成果：
                  <ul>
                  <li>提高页面开发速度。常规管理页面，增删改查开发不超过半小时。一份JSON文档，两个表单组件，一个表格组件。足以满足常规需求。</li>
                  <li>降低页面负责度。页面可通过不同组件搭配，如在表单组件添加时间选择组件，地区选择组件，页面添加Excel导出等，都可通过组件间的搭配满足需求。</li>
                  <li>组件间低耦合。组件功能尽量单一，提供尽量简单的接口，完成组件应该完成的功能。</li>
                  </ul></li>
                  <li>工作不足：
                  <ul>
                  <li>页面随着需求的增长变得臃肿。</li>
                  <li>系统设计之初，只考虑了页面的异步加载。为考虑到页面内组件的异步加载。</li>
                  </ul></li>
                  </ul>
                  <p>面对以上两个问题，设想对臃肿的页面进行组件拆分，使用vue.js 2的动态组件+异步组件+webpack code splitting解决，正在验证中。</p>
                </dd>
              </dl>
            </div>
          </div>
          <div className={style.programme}>
            <div>
              <h2 className={style.title}>开发项目</h2>
              <dl className={style.worklist}>
                <dt>
                  <p className={style.time}>2014.7-2014.9</p>
                  <p className={style.company}>团团一家</p>
                </dt>
                <dd>
                  <p className={style.content}>
                    校园活动平台——使用互联网技术为活动组织者提供活动解决方案，为活动主办方提供信息发布，推广，报名，抢票，投票，抽奖，数据统计等一系列服务的Web服务应用.
                    <br/>
                    本人负责其中微信接口的开发，如活动推送，自动回复，客户信息，扫码登录等等功能。该项目作为人生第一次大型项目，并在校园内获得全校师生认可的项目。不仅在其中检验了学习的成果，也锻炼了团队合作意识。
                  </p>
                </dd>
              </dl>
              <dl className={style.worklist}>
                <dt>
                  <p className={style.time}>2014.10-2015.9</p><p className={style.company}>校园服务平台</p>
                </dt>
                <dd>
                  <p className={style.content}>
                    基于团团一家使用Node.js/Strongloop，MongoDB，Angular.js重构。本人在项目中负责后端部分功能开发，后期负责带领团队，以及部分前端开发。RESTful接口设计，以及如何实现更好的前后端分离留下了深刻映像，并在后来实习公司成功推荐使用Swagger.js。
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Resume)
