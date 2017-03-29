import React, {Component} from 'react'
import Tabs from 'components/ide/Tabs'
import style from 'styles/ide.css'
export default class EditorHeader extends Component {
  constructor () {
    super()
    this.state = {
      tabs: [{
        name: 'HTML',
        index: 1
      }, {
        name: 'CSS',
        index: 2
      }, {
        name: 'JS',
        index: 3
      }],
      activeTab: 1
    }
  }
  tabClick (tab) {
    this.setState({activeTab: tab.index})
    this.props.tabChange(tab.index)
  }
  render () {
    let {save} = this.props
    return (
      <div className={style.header}>
        <div className={style.save} onClick={save}><i className='material-icons'>save</i></div>
        <Tabs tabs={this.state.tabs} active={this.state.activeTab} tabClick={this.tabClick.bind(this)}></Tabs>
      </div>
    )
  }
}
