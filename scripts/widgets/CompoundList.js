import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native'

import * as Theme from '../utils/theme'

export default class CompoundList extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    styles: PropTypes.object,
  }

  static defaultProps = {
    styles: {},
  }

  render() {
    const children = React.Children.toArray(this.props.children)
    const finalChildren = []

    let key = 0
    for (const child of children) {
      if (finalChildren.length !== 0) {
        finalChildren.push(
          <View
            key={key++}
            style={[styles.divider, this.props.styles.divider]}
          />
        )
      }
      finalChildren.push(child)
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {finalChildren}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.contentBackgroundColor,
  },
  divider: {
    ...StyleSheet.flatten(Theme.styles.hLine),
    marginLeft: 20,
  },
})
