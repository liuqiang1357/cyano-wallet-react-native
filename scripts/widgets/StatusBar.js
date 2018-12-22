import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  StatusBar as RCTStatusBar,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

import * as Theme from '../utils/theme'

export default class StatusBar extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    barStyle: PropTypes.string,
  }

  static defaultProps = {
    barStyle: 'light-content',
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <RCTStatusBar
          barStyle={this.props.barStyle}
          translucent={true}
          backgroundColor="transparent"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: DeviceInfo.getAPILevel() < 19 ? 0 : Theme.statusBarHeight,
    backgroundColor: Theme.colorPrimaryDark,
  },
})
