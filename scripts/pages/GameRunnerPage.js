import { observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  WebView
} from 'react-native'

import { bindMethod } from '../utils/decorators'
import * as Theme from '../utils/theme'
import Text from '../widgets/Text'
import Toast from '../widgets/Toast'
import StatusBar from '../widgets/StatusBar'

@observer
export default class GameRunnerPage extends Component {
  @bindMethod onMessage(event) {
    const message = String(event.nativeEvent.data)
    if (message.startsWith('ontprovider://')) {
      Toast.show('Message from WebView:' + message)
      this.webview.postMessage('result')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          style={styles.statusBar}
          barStyle="dark-content"
        />
        <WebView
          style={styles.webview}
          ref={ref => this.webview = ref}
          source={{ uri: 'http://192.168.3.159:8080' }}
          onMessage={this.onMessage}
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
