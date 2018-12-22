import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import { bindMethod } from '../utils/decorators'
import * as Theme from '../utils/theme'
import Text from '../widgets/Text'
import BorderedButton from '../widgets/BorderedButton'
import StatusBar from '../widgets/StatusBar'

@inject('authStore')
@observer
export default class MinePage extends Component {
  @bindMethod onDeleteWalletPress() {
    this.props.authStore.clearAuth()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          style={styles.statusBar}
          barStyle="dark-content"
        />
        <View style={styles.content}>
          <BorderedButton
            style={styles.button}
            styles={{ text: styles.buttonText }}
            text="DELETE WALLET"
            onPress={this.onDeleteWalletPress}
          />
        </View>
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
  content: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  button: {
    width: 200, height: 40,
    backgroundColor: '#ddd', borderRadius: 5,
    shadowColor: '#ddd',
  },
  buttonText: {
    color: Theme.textColorHint, fontSize: 14, fontWeight: 'bold',
  },
})
