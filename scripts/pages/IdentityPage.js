import { observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import * as Theme from '../utils/theme'
import Text from '../widgets/Text'
import StatusBar from '../widgets/StatusBar'

@observer
export default class IdentityPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          style={styles.statusBar}
          barStyle="dark-content"
        />
        <Text>Identity</Text>
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
