import { Provider } from 'mobx-react'
import { destroy } from 'mobx-state-tree'
import React, { Component } from 'react'
import remotedev from 'remotedev'

import AppRoot from './pages/AppRoot'
import RootStore from './stores/RootStore'
import { connectReduxDevtools } from './utils/mobxUtils'

export default class setup extends Component {
  constructor(props) {
    super(props)
    this.rootStore = RootStore.create()
    connectReduxDevtools(remotedev, this.rootStore)
  }

  componentWillUnmount() {
    destroy(this.rootStore)
  }

  render() {
    return (
      <Provider {...this.rootStore}>
        <AppRoot/>
      </Provider>
    )
  }
}
