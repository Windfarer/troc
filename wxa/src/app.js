import React, { Component } from 'react'
import './app.styl'

import '@/utils/async'

import { WithSession } from '@/utils/session'
import { WithRequest } from '@/utils/request'

// keep
class AppWrapper extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return <WithSession>
      <WithRequest>
        <App {...this.props} />
      </WithRequest>
    </WithSession>
  }
}

function App ({ children }) {
  return children
}

export default AppWrapper
