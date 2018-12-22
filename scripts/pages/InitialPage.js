import { observer, inject } from 'mobx-react'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import * as Theme from '../utils/theme'
import Text from '../widgets/Text'
import Image from '../widgets/Image'
import StatusBar from '../widgets/StatusBar'

@inject('authStore')
@observer
export default class InitialPage extends Component {
  componentDidMount() {
    this.props.authStore.loadAuth()
    this.props.navigation.navigate('Home')
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          style={styles.statusBar}
          barStyle="dark-content"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.contentBackgroundColor,
  },
  statusBar: {
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
})
