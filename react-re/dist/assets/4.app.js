webpackJsonp([4],{197:function(e,n,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function u(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var l=n[t];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(n,t,l){return t&&e(n.prototype,t),l&&e(n,l),n}}(),d=u(["\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);\n  background: #fff;\n  padding: 0 24px;\n  box-sizing: border-box;\n  margin-top: 8px;\n  padding-bottom: 16px;\n  & h2 {\n    margin: 0;\n    height: 48px;\n    line-height: 48px;\n    font-size: 20px;\n    color: rgba(0,0,0,0.9);\n  }\n  & .card {\n    margin: 8px -18px;\n    box-shadow: none;\n    padding-bottom: 0;\n  }\n  & .card h2 {\n    font-size: 16px;\n    height: 36px;\n    line-height: 36px;\n  }\n"],["\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);\n  background: #fff;\n  padding: 0 24px;\n  box-sizing: border-box;\n  margin-top: 8px;\n  padding-bottom: 16px;\n  & h2 {\n    margin: 0;\n    height: 48px;\n    line-height: 48px;\n    font-size: 20px;\n    color: rgba(0,0,0,0.9);\n  }\n  & .card {\n    margin: 8px -18px;\n    box-shadow: none;\n    padding-bottom: 0;\n  }\n  & .card h2 {\n    font-size: 16px;\n    height: 36px;\n    line-height: 36px;\n  }\n"]),c=t(2),f=l(c),p=t(6),s=l(p),m=s.default.div.attrs({className:"card"})(d),b=function(e){function n(){return a(this,n),r(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return o(n,e),i(n,[{key:"render",value:function(){return f.default.createElement(m,null,f.default.createElement("h2",null,this.props.src?f.default.createElement("a",{href:this.props.src},this.props.title):this.props.title),this.props.children)}}]),n}(c.Component);n.default=b},198:function(e,n,t){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function r(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}function o(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}function u(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(e,n){for(var t=0;t<n.length;t++){var l=n[t];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(n,t,l){return t&&e(n.prototype,t),l&&e(n,l),n}}(),d=u(["\n  // background: #f1f1f1;\n  padding: 100px 0;\n  min-height: 100%;\n  box-sizing: border-box;\n  @media (max-width: 700px) {\n    padding: 0;\n  }\n"],["\n  // background: #f1f1f1;\n  padding: 100px 0;\n  min-height: 100%;\n  box-sizing: border-box;\n  @media (max-width: 700px) {\n    padding: 0;\n  }\n"]),c=u(["\n  background: #2296f4;\n  height: 300px;\n  position: absolute;\n  width: 100%;\n  top: 0;\n  z-index: -1;\n"],["\n  background: #2296f4;\n  height: 300px;\n  position: absolute;\n  width: 100%;\n  top: 0;\n  z-index: -1;\n"]),f=u(["\n  margin: 0 auto;\n  max-width: 820px;\n  background: #fff;\n  &:after {\n    content: '';\n    display: block;\n    clear: both;\n  }\n"],["\n  margin: 0 auto;\n  max-width: 820px;\n  background: #fff;\n  &:after {\n    content: '';\n    display: block;\n    clear: both;\n  }\n"]),p=u(["\n  height: 310px;\n  background: #E91E63;\n  color: #fff;\n  box-sizing: border-box;\n  padding: 100px 20px;\n  background-image: url(/static/image/bg.png);\n  background-size: 100%;\n  background-position: 0px -300px;\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);\n  & h1 {\n    font-size: 24px;\n    margin-top: 56px;\n  }\n  & p {\n    font-size: 16px;\n    font-weight: 100;\n  }\n"],["\n  height: 310px;\n  background: #E91E63;\n  color: #fff;\n  box-sizing: border-box;\n  padding: 100px 20px;\n  background-image: url(/static/image/bg.png);\n  background-size: 100%;\n  background-position: 0px -300px;\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);\n  & h1 {\n    font-size: 24px;\n    margin-top: 56px;\n  }\n  & p {\n    font-size: 16px;\n    font-weight: 100;\n  }\n"]),s=u(["\n  width: ","%;\n  display: inline-block;\n  box-sizing: border-box;\n  ",";\n  float: left;\n  // @media (max-width: 700px) {\n  //   width: 100%;\n  //   padding-left: 0;\n  // }\n  & dl {\n    margin: 0;\n  }\n  & p, & li, & dd {\n    font-size: 14px;\n    color: rgba(0,0,0,0.87);\n  }\n  & ul {\n    padding-left: 16px;\n  }\n  & li {\n    margin-top: 8px;\n  }\n  & p {\n    text-indent:2em;\n  }\n  & dt, & dd {\n    display: inline-block;\n    height: 36px;\n    line-height: 36px;\n  }\n  & dt {\n    width: 70px;\n    color: rgba(0,0,0,0.54);\n  }\n\n  & dd {\n    width: calc(100% - 70px);\n    margin: 0;\n  }\n\n  & a {\n    color: #ff9800;\n  }\n\n  & b {\n    color: #F44336;\n  }\n"],["\n  width: ","%;\n  display: inline-block;\n  box-sizing: border-box;\n  ",";\n  float: left;\n  // @media (max-width: 700px) {\n  //   width: 100%;\n  //   padding-left: 0;\n  // }\n  & dl {\n    margin: 0;\n  }\n  & p, & li, & dd {\n    font-size: 14px;\n    color: rgba(0,0,0,0.87);\n  }\n  & ul {\n    padding-left: 16px;\n  }\n  & li {\n    margin-top: 8px;\n  }\n  & p {\n    text-indent:2em;\n  }\n  & dt, & dd {\n    display: inline-block;\n    height: 36px;\n    line-height: 36px;\n  }\n  & dt {\n    width: 70px;\n    color: rgba(0,0,0,0.54);\n  }\n\n  & dd {\n    width: calc(100% - 70px);\n    margin: 0;\n  }\n\n  & a {\n    color: #ff9800;\n  }\n\n  & b {\n    color: #F44336;\n  }\n"]),m=t(2),b=l(m),g=t(6),h=l(g),x=t(197),E=l(x),w=h.default.div(d),y=h.default.div(c),k=h.default.div(f),j=h.default.header(p),z=h.default.section(s,function(e){return e.percent||50},function(e){return e.left?"padding-left:"+e.left+"px":""}),O=function(e){function n(){return a(this,n),r(this,(n.__proto__||Object.getPrototypeOf(n)).apply(this,arguments))}return o(n,e),i(n,[{key:"render",value:function(){return b.default.createElement(w,null,b.default.createElement(y,null),b.default.createElement(k,null,b.default.createElement(j,null,b.default.createElement("h1",null,"刘建东"),b.default.createElement("p",null,"生活放荡不羁；技术“博”而不精；热爱JavaScript；追求代码美感。")),b.default.createElement(z,{percent:"60"},b.default.createElement(E.default,{title:"简要介绍"},b.default.createElement("p",null,"从2014年夏天接触web开发，现主攻前端开发，3年+NodeJS和前端开发经验，技术涉猎广，偏向业务编程，注重需求的实现，弱点在于UI和交互上的细节。"),b.default.createElement("p",null,"在校期间带过团队，做过技术分享；从2016年工作以来一直呆在一个公司，参与项目设计，技术选型，开发，测试，发布，团队一直利用最新的技术开发项目。"),b.default.createElement("p",null,"熟悉NodeJS常用框架，MySQL，MongoDB，PgSQL数据库，Vue技术栈，React技术栈以及webpack，git等工具。",b.default.createElement("br",null)),b.default.createElement("p",null)),b.default.createElement(E.default,{title:"工作经历 2016.04.01-至今"},b.default.createElement("p",null,"从2016年4月开始职业生涯，一直就职于",b.default.createElement("b",null,"深圳林晨展华(杭州)科技有限公司"),"，期间参与多个项目开发与落实。其中有维护老项目，带新人开发新项目，也有独立负责的项目。工作内容包括自动化构建，目录结构设计， 代码结构设计，组件设计与编码，代码审查与重构。",b.default.createElement("b",null,"介绍以下两个能够体现价值的项目。")),b.default.createElement(E.default,{title:"租车管理平台项目 独立负责"},b.default.createElement("p",null,"基于对vue的熟悉以及生态等问题选择使用",b.default.createElement("b",null,"vue技术栈"),"+",b.default.createElement("b",null,"element-ui"),"作为基础，到目前为止维护着30+个页面，20+个组件。经过",b.default.createElement("b",null,"三次大型重构"),"，其中的原因包括更好的复用，更简洁的开发与维护，目录结构的调整。",b.default.createElement("br",null),b.default.createElement("br",null),b.default.createElement("b",null,"以下是个人认为做得比较满意的细节：")),b.default.createElement("ul",null,b.default.createElement("li",null,"基于ACL的多级路由:路由生成器。提供权限设置，路由配置，子路由设置等接口。理论上可实现无限级别的权限用户登陆和无限的路由层级。"),b.default.createElement("li",null,"基于配置的表单组件：表单生成组件。基于element-ui基础表单组件封装，提供一个submit事件，form参数接口。form参数通过JSON文档配置表单元素，验证等信息生成完整的表单，验证输入。用很少的代码实现复杂的表单，局限是不能够对表单进行灵活的控制。"),b.default.createElement("li",null,"基于ACL的多级路由：路由生成器。提供权限设置，路由配置，子路由设置等接口。理论上可实现无限级别的权限用户登陆和无限的路由层级。"),b.default.createElement("li",null,"组件化开发思想：提高页面开发速度，降低页面负责度，组件间低耦合。"))),b.default.createElement(E.default,{title:"微信小程序 基础设施建设"},b.default.createElement("ul",null,b.default.createElement("li",null,"开发环境支持: 最初小程序发布时，IDE语法高亮，自动提示不完善，es6不支持给开发带来很多不便。使用rollup开发了小程序的脚手架，自动生成小程序特有的目录结构，以及生成基本小程序模版，html，css到wxml，wxss的转换。"),b.default.createElement("li",null,"Request API封装：小程序提供的request API对于开发和惯用的如axios这样的工具大相径庭，为了更好更方便的开发，封装了和axios一样的使用方式，如通过方法或resource方式使用。"),b.default.createElement("li",null,"其他基础插件：对于很多常用的API也进行了封装，如交互API，toast，modal封装提供promise方式使用，导航API，封装为vue-router一样的使用方式；对地图组件封装了常用的和高德地图相似的API。"))))),b.default.createElement(z,{percent:"40",left:"8"},b.default.createElement(E.default,{title:"基本资料"},b.default.createElement("dl",null,b.default.createElement("dt",null,"性别"),b.default.createElement("dd",null,"男"),b.default.createElement("dt",null,"坐标"),b.default.createElement("dd",null,"杭州"),b.default.createElement("dt",null,"电话"),b.default.createElement("dd",null,"17764592171"),b.default.createElement("dt",null,"邮箱"),b.default.createElement("dd",null,b.default.createElement("a",{href:"mailto:hi@justsoso.me"},"hi@justsoso.me")),b.default.createElement("dt",null,"网站"),b.default.createElement("dd",null,b.default.createElement("a",{href:"www.justsoso.me",target:"_blank"},"www.justsoso.me")),b.default.createElement("dt",null,"github"),b.default.createElement("dd",null,b.default.createElement("a",{href:"https://github.com/realywithoutname",target:"_blank"},"realywithoutname")),b.default.createElement("dt",null,"编程理念"),b.default.createElement("dd",null,"编程是为了解决问题"))),b.default.createElement(E.default,{title:"团团一家校园活动服务平台"},b.default.createElement("p",null,"使用互联网技术为活动组织者提供活动解决方案，为活动主办方提供信息发布，推广，报名，抢票，投票，抽奖，数据统计等一系列服务的Web服务应用."),b.default.createElement("p",null,"第一版使用PHP，MySql，Jquery；第二版使用NodeJS/StrongLoop，MongoDB，AngularJS开发。在项目中主要负责后端开发。")),b.default.createElement(E.default,{title:"JustSoSo个人博客",src:"https://github.com/realywithoutname/decorator-doc"},b.default.createElement("p",null,"该作品后端使用Koa.js，前端使用vue.js，后来使用React.js进行重构。"),b.default.createElement("p",null,"网站使用RSS聚合网络信息，无限加载，HTML5离线缓存，浏览器指纹等方式减少数据加载时间以及身份验证。")),b.default.createElement(E.default,{title:"decorator-doc",src:"https://github.com/realywithoutname/decorator-doc"},b.default.createElement("p",null,"基于Swagger规范以及ES7 Decorator语法编写的一个swagger文档生成器，集成了swagger-ui，验证等功能，支持在koa1.x，koa2.x以及基于connnect的Node.js框架。"),b.default.createElement("p",null,"支持ES7 Decorator语法以及使用基于JSON文档两种使用方式。目前正在公司内部使用。")),b.default.createElement(E.default,{title:"翻译项目"},b.default.createElement("a",{href:"http://www.justsoso.me/blog/58dd23ebcc11fd66b05d5a43"},"fetch(未完成)"),b.default.createElement("br",null),b.default.createElement("a",{href:"http://www.justsoso.me/blog/58ce6434d306ed453d87de1e"},"XMLHttpRequest"),b.default.createElement("br",null),b.default.createElement("a",{href:"https://github.com/realywithoutname/ECMAScript"},"ECMAScript® 2018 Language Specification(未完成)")))))}}]),n}(m.Component);n.default=O}});
//# sourceMappingURL=4.app.js.map