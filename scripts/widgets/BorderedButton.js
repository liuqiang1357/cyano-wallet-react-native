import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native'

import * as Theme from '../utils/theme'

import Text from './Text'

export default class BorderedButton extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    styles: PropTypes.object,
    disabled: PropTypes.bool,
    text: PropTypes.string,
    onPress: PropTypes.func,
    showIndicator: PropTypes.bool,
    indicatorText: PropTypes.string,
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
        activeOpacity={0.5}
        onPress={this.props.onPress}>
        {this.props.showIndicator ? <ActivityIndicator color="white"/> : null}
        {this.props.showIndicator ? <View style={Theme.styles.hSpace}/> : null}
        <Text style={[styles.text, this.props.styles.text]}>
          {
            this.props.showIndicator
            ? this.props.indicatorText || this.props.text
            : this.props.text
          }
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    backgroundColor: Theme.colorPrimary, borderRadius: 22.5, elevation: 2,
    shadowColor: Theme.colorPrimary, shadowOpacity: 0.4, shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 16, color: Theme.textColorPrimaryInverse,
  },
})
