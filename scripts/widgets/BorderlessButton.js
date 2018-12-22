import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  ActivityIndicator,
  TouchableHighlight,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native'

import * as Theme from '../utils/theme'

import Text from './Text'

export default class BorderlessButton extends Component {
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
      <TouchableHighlight
        disabled={this.props.disabled}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          {this.props.showIndicator ? <ActivityIndicator color="gray"/> : null}
          {this.props.showIndicator ? <View style={Theme.styles.hSpace}/> : null}
          <Text style={[styles.text, this.props.styles.text]}>
            {
              this.props.showIndicator
              ? this.props.indicatorText || this.props.text
              : this.props.text
            }
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    backgroundColor: Theme.contentBackgroundColor,
  },
  text: {
    fontSize: 16, color: Theme.textColorHint,
  },
})
