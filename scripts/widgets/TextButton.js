import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native'

import Text from './Text'

export default class TextButton extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    styles: PropTypes.object,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    styles: {},
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        disabled={this.props.disabled}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={this.props.onPress}>
        <Text style={[styles.text, this.props.styles.text]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignItems: 'center',
  },
})
