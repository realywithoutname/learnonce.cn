webpackJsonp([2],{197:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}(),d=o(["\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);\n  background: #fff;\n  padding: 0 24px;\n  box-sizing: border-box;\n  margin-top: 8px;\n  padding-bottom: 16px;\n  & h2 {\n    margin: 0;\n    height: 48px;\n    line-height: 48px;\n    font-size: 20px;\n    color: rgba(0,0,0,0.9);\n  }\n  & .card {\n    margin: 8px -18px;\n    box-shadow: none;\n    padding-bottom: 0;\n  }\n  & .card h2 {\n    font-size: 16px;\n    height: 36px;\n    line-height: 36px;\n  }\n"],["\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);\n  background: #fff;\n  padding: 0 24px;\n  box-sizing: border-box;\n  margin-top: 8px;\n  padding-bottom: 16px;\n  & h2 {\n    margin: 0;\n    height: 48px;\n    line-height: 48px;\n    font-size: 20px;\n    color: rgba(0,0,0,0.9);\n  }\n  & .card {\n    margin: 8px -18px;\n    box-shadow: none;\n    padding-bottom: 0;\n  }\n  & .card h2 {\n    font-size: 16px;\n    height: 36px;\n    line-height: 36px;\n  }\n"]),i=n(2),f=l(i),m=n(6),p=l(m),s=p.default.div.attrs({className:"card"})(d),h=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),c(t,[{key:"render",value:function(){return f.default.createElement(s,null,f.default.createElement("h2",null,this.props.src?f.default.createElement("a",{href:this.props.src},this.props.title):this.props.title),this.props.children)}}]),t}(i.Component);t.default=h},198:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}(),d=o(["\n  max-width: 800px;\n  margin: 0 auto;\n\n  & p, & li, & dd {\n    font-size: 14px;\n    color: rgba(0,0,0,0.87);\n  }\n\n  & h1 {\n    font-size: 28px;\n  }\n\n  & h2 {\n    font-size: 20px;\n    color: rgba(0,0,0,0.9);\n  }\n  \n  & h3 {\n    font-size: 18px;\n    color: rgba(0,0,0,0.9);\n    font-weight: 300;\n    margin: 12px 0;\n  }\n  a {\n    color: #ff9800;\n  }\n"],["\n  max-width: 800px;\n  margin: 0 auto;\n\n  & p, & li, & dd {\n    font-size: 14px;\n    color: rgba(0,0,0,0.87);\n  }\n\n  & h1 {\n    font-size: 28px;\n  }\n\n  & h2 {\n    font-size: 20px;\n    color: rgba(0,0,0,0.9);\n  }\n  \n  & h3 {\n    font-size: 18px;\n    color: rgba(0,0,0,0.9);\n    font-weight: 300;\n    margin: 12px 0;\n  }\n  a {\n    color: #ff9800;\n  }\n"]),i=o(["\n  display: flex;\n  flex-flow: wrap;\n  margin: 20px;\n  & > div {\n    flex: 1;\n  }\n  & p {\n    font-size: 16px;\n  }\n  & > dl {\n    flex: 1;\n    text-align: right;\n  }\n  & > dl > dd, & > dl > dt {\n    display: inline-block;\n    line-height: 32px;\n    height: 32px;\n  }\n  & > dl > dt {\n    overflow: auto;\n  }\n  & > dl > dd {\n    width: calc(100% - 70px);\n    margin: 0;\n    overflow: auto;\n    color: #ff9800;\n  }\n\n"],["\n  display: flex;\n  flex-flow: wrap;\n  margin: 20px;\n  & > div {\n    flex: 1;\n  }\n  & p {\n    font-size: 16px;\n  }\n  & > dl {\n    flex: 1;\n    text-align: right;\n  }\n  & > dl > dd, & > dl > dt {\n    display: inline-block;\n    line-height: 32px;\n    height: 32px;\n  }\n  & > dl > dt {\n    overflow: auto;\n  }\n  & > dl > dd {\n    width: calc(100% - 70px);\n    margin: 0;\n    overflow: auto;\n    color: #ff9800;\n  }\n\n"]),f=o(["\n  width: 32px;\n  line-height: 32px;\n  text-align: center;\n  cursor: default;\n  color: #2296f4;\n  & img {\n    width: 24px;\n    height: 24px;\n    line-height: 32px;\n    color: #2296f4;\n  }\n"],["\n  width: 32px;\n  line-height: 32px;\n  text-align: center;\n  cursor: default;\n  color: #2296f4;\n  & img {\n    width: 24px;\n    height: 24px;\n    line-height: 32px;\n    color: #2296f4;\n  }\n"]),m=o(["\n  margin: 20px;\n"],["\n  margin: 20px;\n"]),p=o(["\n  margin: 20px;\n  & ul {\n    list-style: none;\n    padding: 0;\n  }\n  & .project-name {\n    color: #777;\n  }\n  & .summary {\n    color: #333;\n  }\n"],["\n  margin: 20px;\n  & ul {\n    list-style: none;\n    padding: 0;\n  }\n  & .project-name {\n    color: #777;\n  }\n  & .summary {\n    color: #333;\n  }\n"]),s=o(["\n  margin: 20px;\n  & .time {\n    color: #2296f4;\n  }\n"],["\n  margin: 20px;\n  & .time {\n    color: #2296f4;\n  }\n"]),h=n(2),g=l(h),E=n(6),b=l(E),x=b.default.div(d),w=b.default.section(i),y=b.default.i.attrs({className:"material-icons"})(f),j=b.default.section(m),v=b.default.section(p),_=b.default.section(s),k=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),c(t,[{key:"render",value:function(){return g.default.createElement(x,null,g.default.createElement(w,null,g.default.createElement("div",null,g.default.createElement("h1",null,"刘建东"),g.default.createElement("p",null,g.default.createElement(y,null,"room"),g.default.createElement("span",null,"杭州")),g.default.createElement("p",null,"求职岗位：",g.default.createElement("b",null,"前端工程师"))),g.default.createElement("dl",null,g.default.createElement("dd",null,"17764592171"),g.default.createElement("dt",null,g.default.createElement(y,null,"phone")),g.default.createElement("dd",null,g.default.createElement("a",{href:"mailto:hi@justsoso.me"},"hi@justsoso.me")),g.default.createElement("dt",null,g.default.createElement(y,null,"email")),g.default.createElement("dd",null,g.default.createElement("a",{href:"http://www.justsoso.me",target:"_blank"},"www.justsoso.me")),g.default.createElement("dt",null,g.default.createElement(y,null,"language")),g.default.createElement("dd",null,g.default.createElement("a",{href:"https://github.com/realywithoutname",target:"_blank"},"realywithoutname")),g.default.createElement("dt",null,g.default.createElement(y,null,g.default.createElement("img",{src:"/static/image/github.svg"}))))),g.default.createElement(j,null,g.default.createElement("h2",null,"个人简介"),g.default.createElement("p",null,"从2014年夏天接触web开发，3年+NodeJS和前端开发经验，技术涉猎广，偏向业务编程，注重需求的实现。"),g.default.createElement("p",null,"在校期间带过团队，做过技术分享；工作期间，参与项目设计，技术选型，开发，测试，发布。"),g.default.createElement("p",null,"掌握JavaScript，CSS 2/3，HTML 4/5，熟练应用Vue技术栈，React技术栈，webpack，git等工具；熟悉NodeJS常用框架。"),g.default.createElement("p",null,"尊重“编程解决问题，代码写给人看”的原则，一直以编写可维护性强的程序为目标。")),g.default.createElement(v,null,g.default.createElement("h2",null,"项目经验"),g.default.createElement("ul",null,g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},"store-admin")," ",g.default.createElement("span",{className:"summary"},"多用户租车管理平台")),g.default.createElement("p",null,"该项目为共享单车多级别用户管理平台，由我独立负责，使用vue技术栈+element-ui作为项目基础，历时一年，到目前维护着90+个组件。 期间经过三次大型重构，提高了项目的复用性，降低了开发和维护成本。"),g.default.createElement("p",null,"设计基于ACL的多级路由生成器，对导航提供权限控制，子路由控制，在导航开始时对用户访问权限进行控制。 减轻在业务程序中进行权限控制（页面内不同操作权限需要独立配置），理论上可实现无限级别的权限用户登陆和无限的路由层级。"),g.default.createElement("p",null,"开发基于配置的表单生成组件和table生成组件，以基于数据生成代替编码的方式，减少了编写相同模式的代码。 使如表单，表格这样的需求完成变得简单快速，节约更多的时间关注业务实现。 如一个过滤表单和一个表单组成的管理页面，HTML代码可能只需要几行(理想情况😁)。")),g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},"一动出行 APP")," ",g.default.createElement("span",{className:"summary"},"微信小程序租车客户端")),g.default.createElement("p",null,"该项目是公司运营的微信小程序，我在其中负责前期开发，后期由新同事完成。"),g.default.createElement("p",null,"基于rollup开发小程序脚手架，以解决最初小程序发布时，IDE语法高亮，自动提示不完善，es6不支持给开发带来的不便。 支持自动生成小程序特有的目录结构；以及生成基本小程序模版；html，css，es6到wxml，wxss，es5的转换。"),g.default.createElement("p",null,"封装如request，modal，toast等常用API，提供Promise使用方式，request API为了更方便的管理后端接口，提供和axios一样的使用方式，如通过方法或resource方式使用；导航API，封装为vue-router一样的使用方式；对地图组件封装了常用的和高德地图相似的API。")),g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},g.default.createElement("a",{href:"http://www.justsoso.me",target:"_blank"},"Just soso"))," ",g.default.createElement("span",{className:"summary"},"个人博客")),g.default.createElement("p",null,"该作品后端使用Koa.js，前端使用vue.js，后来使用React.js进行重构。"),g.default.createElement("p",null,"网站使用RSS聚合网络信息，无限加载，HTML5离线缓存，浏览器指纹等方式减少数据加载时间以及身份验证。")),g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},g.default.createElement("a",{href:"https://github.com/realywithoutname/decorator-doc",target:"_blank"},"decorator-doc"))," ",g.default.createElement("span",{className:"summary"},"NodeJS swagger.json生成器")),g.default.createElement("p",null,"基于Swagger规范以及ES7 Decorator语法编写的一个swagger文档生成器，集成了swagger-ui，验证，路由等功能，支持在koa1.x，koa2.x以及基于connnect的Node.js框架。"),g.default.createElement("p",null,"支持ES7 Decorator语法以及使用基于JSON文档两种使用方式。目前正在公司内部使用。")),g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},"翻译计划")),g.default.createElement("p",null,g.default.createElement("a",{href:"http://www.justsoso.me/blog/58ce6434d306ed453d87de1e",target:"_blank"},"XMLHttpRequest")," 第一次翻译英文规范文档，目前为翻译完成状态，但是没有经过专业校对。"),g.default.createElement("p",null,g.default.createElement("a",{href:"http://www.justsoso.me/blog/58dd23ebcc11fd66b05d5a43",target:"_blank"},"fetch")," fetch 规范，本地翻译中，希望作为一个跟踪官方修改(github)的项目维护。"),g.default.createElement("p",null,g.default.createElement("a",{href:"https://github.com/realywithoutname/ECMAScript"},"ECMAScript® 2018 Language Specification")," ECMAScript 官方规范翻译，目前进度为第七章，希望维持与官方修改进度相同。")))),g.default.createElement(_,null,g.default.createElement("h2",null,"教育与工作"),g.default.createElement("p",null,g.default.createElement("a",null,"杭州电子科技大学")," 网络工程 ",g.default.createElement("span",{className:"time"},"2013.9 - 2017.7")),g.default.createElement("p",null,g.default.createElement("a",null,"深圳林晨展华(杭州)科技有限公司")," web前端工程师 ",g.default.createElement("span",{className:"time"},"2016.4 - 至今"))))}}]),t}(h.Component);t.default=k},199:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}(),d=o(["\n  // background: #f1f1f1;\n  padding: 100px 0;\n  min-height: 100%;\n  box-sizing: border-box;\n  @media (max-width: 700px) {\n    padding: 0;\n  }\n"],["\n  // background: #f1f1f1;\n  padding: 100px 0;\n  min-height: 100%;\n  box-sizing: border-box;\n  @media (max-width: 700px) {\n    padding: 0;\n  }\n"]),i=o(["\n  background: #2296f4;\n  height: 300px;\n  position: absolute;\n  width: 100%;\n  top: 0;\n  z-index: -1;\n"],["\n  background: #2296f4;\n  height: 300px;\n  position: absolute;\n  width: 100%;\n  top: 0;\n  z-index: -1;\n"]),f=o(["\n  margin: 0 auto;\n  max-width: 820px;\n  background: #fff;\n  &:after {\n    content: '';\n    display: block;\n    clear: both;\n  }\n"],["\n  margin: 0 auto;\n  max-width: 820px;\n  background: #fff;\n  &:after {\n    content: '';\n    display: block;\n    clear: both;\n  }\n"]),m=o(["\n  height: 310px;\n  background: #E91E63;\n  color: #fff;\n  box-sizing: border-box;\n  padding: 100px 20px;\n  background-image: url(/static/image/bg.png);\n  background-size: 100%;\n  background-position: 0px -300px;\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);\n  & h1 {\n    font-size: 24px;\n    margin-top: 56px;\n  }\n  & p {\n    font-size: 16px;\n    font-weight: 100;\n  }\n"],["\n  height: 310px;\n  background: #E91E63;\n  color: #fff;\n  box-sizing: border-box;\n  padding: 100px 20px;\n  background-image: url(/static/image/bg.png);\n  background-size: 100%;\n  background-position: 0px -300px;\n  box-shadow: 0 0 2px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.26);\n  & h1 {\n    font-size: 24px;\n    margin-top: 56px;\n  }\n  & p {\n    font-size: 16px;\n    font-weight: 100;\n  }\n"]),p=o(["\n  width: ","%;\n  display: inline-block;\n  box-sizing: border-box;\n  ",";\n  float: left;\n  // @media (max-width: 700px) {\n  //   width: 100%;\n  //   padding-left: 0;\n  // }\n  & dl {\n    margin: 0;\n  }\n  & p, & li, & dd {\n    font-size: 14px;\n    color: rgba(0,0,0,0.87);\n  }\n  & ul {\n    padding-left: 16px;\n  }\n  & li {\n    margin-top: 8px;\n  }\n  & p {\n    text-indent:2em;\n  }\n  & dt, & dd {\n    display: inline-block;\n    height: 36px;\n    line-height: 36px;\n  }\n  & dt {\n    width: 70px;\n    color: rgba(0,0,0,0.54);\n  }\n\n  & dd {\n    width: calc(100% - 70px);\n    margin: 0;\n  }\n\n  & a {\n    color: #ff9800;\n  }\n\n  // & b {\n  //   color: #F44336;\n  // }\n"],["\n  width: ","%;\n  display: inline-block;\n  box-sizing: border-box;\n  ",";\n  float: left;\n  // @media (max-width: 700px) {\n  //   width: 100%;\n  //   padding-left: 0;\n  // }\n  & dl {\n    margin: 0;\n  }\n  & p, & li, & dd {\n    font-size: 14px;\n    color: rgba(0,0,0,0.87);\n  }\n  & ul {\n    padding-left: 16px;\n  }\n  & li {\n    margin-top: 8px;\n  }\n  & p {\n    text-indent:2em;\n  }\n  & dt, & dd {\n    display: inline-block;\n    height: 36px;\n    line-height: 36px;\n  }\n  & dt {\n    width: 70px;\n    color: rgba(0,0,0,0.54);\n  }\n\n  & dd {\n    width: calc(100% - 70px);\n    margin: 0;\n  }\n\n  & a {\n    color: #ff9800;\n  }\n\n  // & b {\n  //   color: #F44336;\n  // }\n"]),s=n(2),h=l(s),g=n(6),E=l(g),b=n(197),x=l(b),w=E.default.div(d),y=E.default.div(i),j=E.default.div(f),v=E.default.header(m),_=E.default.section(p,function(e){return e.percent||50},function(e){return e.left?"padding-left:"+e.left+"px":""}),k=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),c(t,[{key:"render",value:function(){return h.default.createElement(w,null,h.default.createElement(y,null),h.default.createElement(j,null,h.default.createElement(v,null,h.default.createElement("h1",null,"刘建东"),h.default.createElement("p",null,"生活放荡不羁；技术“博”而不精；热爱JavaScript；追求代码美感。")),h.default.createElement(_,{percent:"60"},h.default.createElement(x.default,{title:"简要介绍"},h.default.createElement("p",null,"从2014年夏天接触web开发，现主攻前端开发，3年+NodeJS和前端开发经验，技术涉猎广，偏向业务编程，注重需求的实现，弱点在于UI和交互上的细节。"),h.default.createElement("p",null,"在校期间带过团队，做过技术分享；从2016年工作以来一直呆在一个公司，参与项目设计，技术选型，开发，测试，发布，团队一直利用最新的技术开发项目。"),h.default.createElement("p",null,"熟悉NodeJS常用框架，MySQL，MongoDB，PgSQL数据库，Vue技术栈，React技术栈以及webpack，git等工具。",h.default.createElement("br",null)),h.default.createElement("p",null)),h.default.createElement(x.default,{title:"工作经历 2016.04.01-至今"},h.default.createElement("p",null,"从2016年4月开始职业生涯，一直就职于",h.default.createElement("b",null,"深圳林晨展华(杭州)科技有限公司"),"，期间参与多个项目开发与落实。其中有维护老项目，带新人开发新项目，也有独立负责的项目。工作内容包括自动化构建，目录结构设计， 代码结构设计，组件设计与编码，代码审查与重构。",h.default.createElement("b",null,"介绍以下两个能够体现价值的项目。")),h.default.createElement(x.default,{title:"租车管理平台项目 独立负责"},h.default.createElement("p",null,"基于对vue的熟悉以及生态等问题选择使用",h.default.createElement("b",null,"vue技术栈"),"+",h.default.createElement("b",null,"element-ui"),"作为基础，到目前为止维护着30+个页面，20+个组件。经过",h.default.createElement("b",null,"三次大型重构"),"，其中的原因包括更好的复用，更简洁的开发与维护，目录结构的调整。",h.default.createElement("br",null),h.default.createElement("br",null),h.default.createElement("b",null,"以下是个人认为做得比较满意的细节：")),h.default.createElement("ul",null,h.default.createElement("li",null,"基于ACL的多级路由:路由生成器。提供权限设置，路由配置，子路由设置等接口。理论上可实现无限级别的权限用户登陆和无限的路由层级。"),h.default.createElement("li",null,"基于配置的表单组件：表单生成组件。基于element-ui基础表单组件封装，提供一个submit事件，form参数接口。form参数通过JSON文档配置表单元素，验证等信息生成完整的表单，验证输入。用很少的代码实现复杂的表单，局限是不能够对表单进行灵活的控制。"),h.default.createElement("li",null,"组件化开发思想：提高页面开发速度，降低页面负责度，组件间低耦合。"))),h.default.createElement(x.default,{title:"微信小程序 基础设施建设"},h.default.createElement("ul",null,h.default.createElement("li",null,"开发环境支持: 最初小程序发布时，IDE语法高亮，自动提示不完善，es6不支持给开发带来很多不便。使用rollup开发了小程序的脚手架，自动生成小程序特有的目录结构，以及生成基本小程序模版，html，css到wxml，wxss的转换。"),h.default.createElement("li",null,"Request API封装：小程序提供的request API对于开发和惯用的如axios这样的工具大相径庭，为了更好更方便的开发，封装了和axios一样的使用方式，如通过方法或resource方式使用。"),h.default.createElement("li",null,"其他基础插件：对于很多常用的API也进行了封装，如交互API，toast，modal封装提供promise方式使用，导航API，封装为vue-router一样的使用方式；对地图组件封装了常用的和高德地图相似的API。"))))),h.default.createElement(_,{percent:"40",left:"8"},h.default.createElement(x.default,{title:"基本资料"},h.default.createElement("dl",null,h.default.createElement("dt",null,"性别"),h.default.createElement("dd",null,"男"),h.default.createElement("dt",null,"坐标"),h.default.createElement("dd",null,"杭州"),h.default.createElement("dt",null,"电话"),h.default.createElement("dd",null,"17764592171"),h.default.createElement("dt",null,"学校"),h.default.createElement("dd",null,"杭州电子科技大学"),h.default.createElement("dt",null,"专业"),h.default.createElement("dd",null,"网络工程"),h.default.createElement("dt",null,"邮箱"),h.default.createElement("dd",null,h.default.createElement("a",{href:"mailto:hi@justsoso.me"},"hi@justsoso.me")),h.default.createElement("dt",null,"网站"),h.default.createElement("dd",null,h.default.createElement("a",{href:"www.justsoso.me",target:"_blank"},"www.justsoso.me")),h.default.createElement("dt",null,"github"),h.default.createElement("dd",null,h.default.createElement("a",{href:"https://github.com/realywithoutname",target:"_blank"},"realywithoutname")),h.default.createElement("dt",null,"编程理念"),h.default.createElement("dd",null,"编程是为了解决问题"))),h.default.createElement(x.default,{title:"团团一家校园活动服务平台"},h.default.createElement("p",null,"使用互联网技术为活动组织者提供活动解决方案，为活动主办方提供信息发布，推广，报名，抢票，投票，抽奖，数据统计等一系列服务的Web服务应用."),h.default.createElement("p",null,"第一版使用PHP，MySql，Jquery；第二版使用NodeJS/StrongLoop，MongoDB，AngularJS开发。在项目中主要负责后端开发。")),h.default.createElement(x.default,{title:"JustSoSo个人博客",src:"http://www.justsoso.me"},h.default.createElement("p",null,"该作品后端使用Koa.js，前端使用vue.js，后来使用React.js进行重构。"),h.default.createElement("p",null,"网站使用RSS聚合网络信息，无限加载，HTML5离线缓存，浏览器指纹等方式减少数据加载时间以及身份验证。")),h.default.createElement(x.default,{title:"decorator-doc",src:"https://github.com/realywithoutname/decorator-doc"},h.default.createElement("p",null,"基于Swagger规范以及ES7 Decorator语法编写的一个swagger文档生成器，集成了swagger-ui，验证等功能，支持在koa1.x，koa2.x以及基于connnect的Node.js框架。"),h.default.createElement("p",null,"支持ES7 Decorator语法以及使用基于JSON文档两种使用方式。目前正在公司内部使用。")),h.default.createElement(x.default,{title:"翻译项目"},h.default.createElement("a",{href:"http://www.justsoso.me/blog/58dd23ebcc11fd66b05d5a43"},"fetch(未完成)"),h.default.createElement("br",null),h.default.createElement("a",{href:"http://www.justsoso.me/blog/58ce6434d306ed453d87de1e"},"XMLHttpRequest"),h.default.createElement("br",null),h.default.createElement("a",{href:"https://github.com/realywithoutname/ECMAScript"},"ECMAScript® 2018 Language Specification(未完成)")))))}}]),t}(s.Component);t.default=k},200:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function o(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}(),d=o(["\n  max-width: 800px;\n  margin: 0 auto;\n\n  & p, & li, & dd {\n    font-size: 14px;\n    color: rgba(0,0,0,0.87);\n  }\n\n  & h1 {\n    font-size: 28px;\n  }\n\n  & h2 {\n    font-size: 20px;\n    color: rgba(0,0,0,0.9);\n  }\n  \n  & h3 {\n    font-size: 18px;\n    color: rgba(0,0,0,0.9);\n    font-weight: 300;\n    margin: 12px 0;\n  }\n  a {\n    color: #ff9800;\n  }\n"],["\n  max-width: 800px;\n  margin: 0 auto;\n\n  & p, & li, & dd {\n    font-size: 14px;\n    color: rgba(0,0,0,0.87);\n  }\n\n  & h1 {\n    font-size: 28px;\n  }\n\n  & h2 {\n    font-size: 20px;\n    color: rgba(0,0,0,0.9);\n  }\n  \n  & h3 {\n    font-size: 18px;\n    color: rgba(0,0,0,0.9);\n    font-weight: 300;\n    margin: 12px 0;\n  }\n  a {\n    color: #ff9800;\n  }\n"]),i=o(["\n  display: flex;\n  flex-flow: wrap;\n  margin: 20px;\n  & > div {\n    flex: 1;\n  }\n  & p {\n    font-size: 16px;\n  }\n  & > dl {\n    flex: 1;\n    text-align: right;\n  }\n  & > dl > dd, & > dl > dt {\n    display: inline-block;\n    line-height: 32px;\n    height: 32px;\n  }\n  & > dl > dt {\n    overflow: auto;\n  }\n  & > dl > dd {\n    width: calc(100% - 70px);\n    margin: 0;\n    overflow: auto;\n    color: #ff9800;\n  }\n\n"],["\n  display: flex;\n  flex-flow: wrap;\n  margin: 20px;\n  & > div {\n    flex: 1;\n  }\n  & p {\n    font-size: 16px;\n  }\n  & > dl {\n    flex: 1;\n    text-align: right;\n  }\n  & > dl > dd, & > dl > dt {\n    display: inline-block;\n    line-height: 32px;\n    height: 32px;\n  }\n  & > dl > dt {\n    overflow: auto;\n  }\n  & > dl > dd {\n    width: calc(100% - 70px);\n    margin: 0;\n    overflow: auto;\n    color: #ff9800;\n  }\n\n"]),f=o(["\n  width: 32px;\n  line-height: 32px;\n  text-align: center;\n  cursor: default;\n  color: #2296f4;\n  & img {\n    width: 24px;\n    height: 24px;\n    line-height: 32px;\n    color: #2296f4;\n  }\n"],["\n  width: 32px;\n  line-height: 32px;\n  text-align: center;\n  cursor: default;\n  color: #2296f4;\n  & img {\n    width: 24px;\n    height: 24px;\n    line-height: 32px;\n    color: #2296f4;\n  }\n"]),m=o(["\n  margin: 20px;\n"],["\n  margin: 20px;\n"]),p=o(["\n  margin: 20px;\n  & ul {\n    list-style: none;\n    padding: 0;\n  }\n  & .project-name {\n    color: #777;\n  }\n  & .summary {\n    color: #333;\n  }\n"],["\n  margin: 20px;\n  & ul {\n    list-style: none;\n    padding: 0;\n  }\n  & .project-name {\n    color: #777;\n  }\n  & .summary {\n    color: #333;\n  }\n"]),s=o(["\n  margin: 20px;\n  & .time {\n    color: #2296f4;\n  }\n"],["\n  margin: 20px;\n  & .time {\n    color: #2296f4;\n  }\n"]),h=n(2),g=l(h),E=n(6),b=l(E),x=b.default.div(d),w=b.default.section(i),y=b.default.i.attrs({className:"material-icons"})(f),j=b.default.section(m),v=b.default.section(p),_=b.default.section(s),k=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u(t,e),c(t,[{key:"render",value:function(){return g.default.createElement(x,null,g.default.createElement(w,null,g.default.createElement("div",null,g.default.createElement("h1",null,"刘建东"),g.default.createElement("p",null,g.default.createElement(y,null,"room"),g.default.createElement("span",null,"杭州")),g.default.createElement("p",null,"求职岗位：",g.default.createElement("b",null,"前端工程师"))),g.default.createElement("dl",null,g.default.createElement("dd",null,"17764592171"),g.default.createElement("dt",null,g.default.createElement(y,null,"phone")),g.default.createElement("dd",null,g.default.createElement("a",{href:"mailto:hi@justsoso.me"},"hi@justsoso.me")),g.default.createElement("dt",null,g.default.createElement(y,null,"email")),g.default.createElement("dd",null,g.default.createElement("a",{href:"http://www.justsoso.me",target:"_blank"},"www.justsoso.me")),g.default.createElement("dt",null,g.default.createElement(y,null,"language")),g.default.createElement("dd",null,g.default.createElement("a",{href:"https://github.com/realywithoutname",target:"_blank"},"realywithoutname")),g.default.createElement("dt",null,g.default.createElement(y,null,g.default.createElement("img",{src:"/static/image/github.svg"}))))),g.default.createElement(j,null,g.default.createElement("h2",null,"个人简介"),g.default.createElement("p",null,"从2014年夏天接触web开发，3年+NodeJS和前端开发经验，技术涉猎广，偏向业务编程，注重需求的实现。"),g.default.createElement("p",null,"在校期间带过团队，做过技术分享；工作期间，参与项目设计，技术选型，开发，测试，发布。"),g.default.createElement("p",null,"掌握JavaScript，CSS 2/3，HTML 4/5，熟练应用Vue技术栈，React技术栈，webpack，git等工具；熟悉NodeJS常用框架。"),g.default.createElement("p",null,"尊重“编程解决问题，代码写给人看”的原则，一直以编写可维护性强的程序为目标。")),g.default.createElement(v,null,g.default.createElement("h2",null,"项目经验"),g.default.createElement("ul",null,g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},"store-admin")," ",g.default.createElement("span",{className:"summary"},"多用户租车管理平台")),g.default.createElement("p",null,"该项目为共享单车多级别用户管理平台，由我独立负责，使用vue技术栈+element-ui作为项目基础，历时一年，到目前维护着90+个组件。 期间经过三次大型重构，提高了项目的复用性，降低了开发和维护成本。"),g.default.createElement("p",null,"设计基于ACL的多级路由生成器，对导航提供权限控制，子路由控制，在导航开始时对用户访问权限进行控制。 减轻在业务程序中进行权限控制（页面内不同操作权限需要独立配置），理论上可实现无限级别的权限用户登陆和无限的路由层级。"),g.default.createElement("p",null,"开发基于配置的表单生成组件和table生成组件，以基于数据生成代替编码的方式，减少了编写相同模式的代码。 使如表单，表格这样的需求完成变得简单快速，节约更多的时间关注业务实现。 如一个过滤表单和一个表单组成的管理页面，HTML代码可能只需要几行(理想情况😁)。")),g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},"一动出行 APP")," ",g.default.createElement("span",{className:"summary"},"微信小程序租车客户端")),g.default.createElement("p",null,"该项目是公司运营的微信小程序，我在其中负责前期开发，后期由新同事完成。"),g.default.createElement("p",null,"基于rollup开发小程序脚手架，以解决最初小程序发布时，IDE语法高亮，自动提示不完善，es6不支持给开发带来的不便。 支持自动生成小程序特有的目录结构；以及生成基本小程序模版；html，css，es6到wxml，wxss，es5的转换。"),g.default.createElement("p",null,"封装如request，modal，toast等常用API，提供Promise使用方式，request API为了更方便的管理后端接口，提供和axios一样的使用方式，如通过方法或resource方式使用；导航API，封装为vue-router一样的使用方式；对地图组件封装了常用的和高德地图相似的API。")),g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},g.default.createElement("a",{href:"http://www.justsoso.me",target:"_blank"},"Just soso"))," ",g.default.createElement("span",{className:"summary"},"个人博客")),g.default.createElement("p",null,"该作品后端使用Koa.js，前端使用vue.js，后来使用React.js进行重构。"),g.default.createElement("p",null,"网站使用RSS聚合网络信息，无限加载，HTML5离线缓存，浏览器指纹等方式减少数据加载时间以及身份验证。")),g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},g.default.createElement("a",{href:"https://github.com/realywithoutname/decorator-doc",target:"_blank"},"decorator-doc"))," ",g.default.createElement("span",{className:"summary"},"NodeJS swagger.json生成器")),g.default.createElement("p",null,"基于Swagger规范以及ES7 Decorator语法编写的一个swagger文档生成器，集成了swagger-ui，验证，路由等功能，支持在koa1.x，koa2.x以及基于connnect的Node.js框架。"),g.default.createElement("p",null,"支持ES7 Decorator语法以及使用基于JSON文档两种使用方式。目前正在公司内部使用。")),g.default.createElement("li",null,g.default.createElement("h3",null,g.default.createElement("span",{className:"project-name"},"翻译计划")),g.default.createElement("p",null,g.default.createElement("a",{href:"http://www.justsoso.me/blog/58ce6434d306ed453d87de1e",target:"_blank"},"XMLHttpRequest")," 第一次翻译英文规范文档，目前为翻译完成状态，但是没有经过专业校对。"),g.default.createElement("p",null,g.default.createElement("a",{href:"http://www.justsoso.me/blog/58dd23ebcc11fd66b05d5a43",target:"_blank"},"fetch")," fetch 规范，本地翻译中，希望作为一个跟踪官方修改(github)的项目维护。"),g.default.createElement("p",null,g.default.createElement("a",{href:"https://github.com/realywithoutname/ECMAScript"},"ECMAScript® 2018 Language Specification")," ECMAScript 官方规范翻译，目前进度为第七章，希望维持与官方修改进度相同。")))),g.default.createElement(_,null,g.default.createElement("h2",null,"教育与工作"),g.default.createElement("p",null,g.default.createElement("a",null,"杭州电子科技大学")," 网络工程 ",g.default.createElement("span",{className:"time"},"2013.9 - 2017.7")),g.default.createElement("p",null,g.default.createElement("a",null,"深圳林晨展华(杭州)科技有限公司")," web前端工程师 ",g.default.createElement("span",{className:"time"},"2016.4 - 至今"))))}}]),t}(h.Component);t.default=k}});
//# sourceMappingURL=2.app.js.map