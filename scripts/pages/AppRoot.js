import { comparer, reaction } from 'mobx'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import {
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation'

import * as ErrorUtils from '../utils/errorUtils'
import * as Theme from '../utils/theme'
import Toast from '../widgets/Toast'

import CreateAccountPage from './CreateAccountPage'
import GameRunnerPage from './GameRunnerPage'
import HomePage from './HomePage'
import ImportPrivateKeyPage from './ImportPrivateKeyPage'
import InitialPage from './InitialPage'

const AppNavigator = createStackNavigator({
  Home: { screen: HomePage },
  CreateAccount: { screen: CreateAccountPage },
  ImportPrivateKey: { screen: ImportPrivateKeyPage },
  GameRunner: { screen: GameRunnerPage },
}, {
    headerMode: 'none',
    transitionConfig: Theme.stackTransitionConfig,
    cardStyle: { backgroundColor: Theme.backgroundColor },
  })

const AppRootNavigator = createSwitchNavigator({
  Initial: { screen: InitialPage },
  App: { screen: AppNavigator },
})

@inject('errorStore')
@observer
export default class AppRoot extends Component {
  componentDidMount() {
    this.disposer = reaction(
      () => this.props.errorStore.lastError,
      error => this.handleLastError(error),
      { fireImmediately: true, equals: comparer.structural },
    )
  }

  componentWillUnmount() {
    this.disposer()
  }

  handleLastError(error) {
    if (error) {
      this.props.errorStore.clearError(error)
      Toast.show(ErrorUtils.getLocalMessage(error))
    }
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={Theme.styles ?.flex1}
        enabled={Platform.OS === 'ios'}
        behavior="padding">
        <AppRootNavigator ref={ref => this.navigaor = ref} />
      </KeyboardAvoidingView>
    )
  }
}
