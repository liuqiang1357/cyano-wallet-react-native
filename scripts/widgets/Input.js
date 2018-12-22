import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native'

import * as Theme from '../utils/theme'

export default class Input extends Component {
  static propTypes = {
    ...TextInput.propTypes,
  }

  static defaultProps = {
    placeholderTextColor: Theme.textColorTertiary,
  }

  render() {
    return (
      <TextInput
        {...this.props}
        style={[styles.base, this.props.style]}
      />
    )
  }
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: Platform.OS === 'android' ? 0 : 2.5, paddingHorizontal: 1,
    fontSize: 15, color: Theme.textColorPrimary,
  },
})
