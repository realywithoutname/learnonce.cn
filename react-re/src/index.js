import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, hashHistory } from 'react-router'
import { connect } from 'react-redux'

import routes from './route'
import configureStore from 'src/redux/store'
import {isApp, auth} from 'src/redux/actions'
import Fingerprint from '../dist/static/fingerprint'
import Tip from 'components/Tip'

let store = configureStore()
let finger = new Fingerprint({canvas: true}).get()

store.dispatch(auth(finger))
store.dispatch({type: 'FINGER', value: finger})
let isapp = window.navigator.standalone || true
isapp && store.dispatch(isApp())

let TipComponent = connect(
  (state) => ({error: state.error})
)(Tip)

render((
  <Provider store={store}>
    <div className='page'>
      <TipComponent isApp={isapp} clear={
        () => store.dispatch({type: 'CLEAR_ERROR'})
      } />
      <Router history={hashHistory} routes={routes} />
    </div>
  </Provider>
), document.getElementById('app'))
