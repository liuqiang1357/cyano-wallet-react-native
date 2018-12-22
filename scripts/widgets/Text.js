import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text as RCTText,
} from 'react-native'

import * as Theme from '../utils/theme'

export default class Text extends Component {
  static propTypes = {
    ...RCTText.propTypes,
  }

  render() {
    return (
      <RCTText
        {...this.props}
        style={[styles.base, this.props.style]}
      />
    )
  }
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Platform.OS === 'android' ? 0 : 2.5,
    fontSize: 15, color: Theme.textColorSecondary,
  },
})
