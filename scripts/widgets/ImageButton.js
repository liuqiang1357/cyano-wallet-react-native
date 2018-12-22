import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
} from 'react-native'

import * as Theme from '../utils/theme'

import Image from './Image'

export default class ImageButton extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    styles: PropTypes.object,
    disabled: PropTypes.bool,
    source: Image.propTypes.source,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    styles: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      pressed: false
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        style={[styles.container, this.props.style]}
        disabled={this.props.disabled}
        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
        onPressIn={() => this.setState({ pressed: true })}
        onPressOut={() => this.setState({ pressed: false })}
        onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          <Image
            style={[StyleSheet.absoluteFill, { opacity: this.state.pressed ? 0.2 : 0 }]}
            source={require('../resources/ic_circle_black.png')}
          />
          <Image
            style={[styles.image, this.props.styles.image]}
            source={this.props.source}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignItems: 'center',
  },
  image: {
    ...StyleSheet.flatten(Theme.styles.iconImage),
  },
})
