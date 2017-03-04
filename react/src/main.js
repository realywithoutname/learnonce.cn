import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, Link, hashHistory } from 'react-router'

import routes from './route'
import configureStore from 'src/redux/store'
import {isApp} from 'src/redux/actions'
import * as css from 'styles/global.css'
let store = configureStore()

window.navigator.standalone && store.dispatch(isApp())
render((
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>
), document.getElementById('app'))
