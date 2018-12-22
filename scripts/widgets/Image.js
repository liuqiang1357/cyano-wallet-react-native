import _ from 'lodash'
import React, { Component } from 'react'
import {
  Image as RCTImage,
  StyleSheet,
  View,
} from 'react-native'

const ViewStylePropTypes = require('ViewStylePropTypes')
const ViewStyleKeys = Object.keys(ViewStylePropTypes)

export default class Image extends Component {
  static propTypes = {
    ...RCTImage.propTypes,
  }

  render() {
    const style = StyleSheet.flatten([styles.base, this.props.style])

    const containerStyle = _.pick(style, ViewStyleKeys)
    const contentStyle = _.omit(style, ViewStyleKeys)

    const contentProps = {
      ...this.props,
      style: [contentStyle, styles.content],
      children: null,
    }

    return (
      <View style={containerStyle}>
        <RCTImage {...contentProps}/>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  base: {
    resizeMode: 'contain',
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    width: undefined, height: undefined,
  },
})
