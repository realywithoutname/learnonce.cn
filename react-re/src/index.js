import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

import routes from './route'
import Tip from 'components/Tip'
import puller from './puller'
import API from 'src/api-config'

API.auth().then(() => puller.push('auth', true)).catch(() => puller.push('auth', false))

let isapp = window.navigator.standalone

render((
  <div className={`${isapp ? 'app' : ''} page`}>
    <Tip isApp={isapp} />
    <Router history={browserHistory} routes={routes} />
  </div>
), document.getElementById('app'))
