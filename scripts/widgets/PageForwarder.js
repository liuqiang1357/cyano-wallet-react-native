import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  ViewPropTypes,
} from 'react-native'

import Image from './Image'

export default class PageForwarder extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    type: PropTypes.oneOf(['light', 'dark']),
    showInAndroid: PropTypes.bool,
  }

  static defaultProps = {
    type: 'dark',
    showInAndroid: true,
  }

  render() {
    return Platform.OS === 'ios' || this.props.showInAndroid ? (
      <Image
        style={[styles.container, this.props.style]}
        source={this.props.type === 'dark'
            ? require('../resources/ic_goto_dark.png')
            : require('../resources/ic_goto.png')
        }
      />
    ) : null
  }
}

const styles = StyleSheet.create({
  container: {
    width: 18, height: 18, marginLeft: 5,
  },
})
