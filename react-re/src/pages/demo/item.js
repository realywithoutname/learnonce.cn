import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'
import ListItem from 'components/ListItemStyle'
import { formatDate } from 'src/util'

const Time = styled.span`
  color: #666;
  opacity: .4;
`

class DemoItem extends Component {
  render() {
    let { demo } = this.props
    return (
      <ListItem>
        <ListItem.Header>
          <Link target="_blank" to={'/demos/' + demo._id}>{demo.title}</Link>
        </ListItem.Header>
        <ListItem.Footer>
          <Time>{formatDate(demo.createTime, 'YY·MM·DD')}</Time>
        </ListItem.Footer>
      </ListItem>
    )
  }
}

export default DemoItem