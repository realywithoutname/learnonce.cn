import React, {Component} from 'react'
import style from 'styles/ide.css'
export default class IEDEditor extends Component {
  render () {
    let {tabs, tabClick, active} = this.props
    return (
      <div className={style.tabs}>
        {
          tabs.map((tab) => {
            return (
              <div key={tab.index} className={`${tab.index === active ? style.active : ''} ${style.tab}`} onClick={() => {
                tabClick(tab)
              }}>{tab.name}</div>
            )
          })
        }
      </div>
    )
  }
}
