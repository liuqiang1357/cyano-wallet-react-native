import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native'

import * as Theme from '../utils/theme'

import ImageButton from './ImageButton'
import StatusBar from './StatusBar'
import Text from './Text'

export default class NavigationBar extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    styles: PropTypes.object,
    showStatusBar: PropTypes.bool,
    title: PropTypes.string,
    titlePosition: PropTypes.oneOf(['left', 'center', 'right']),
    leftButtons: PropTypes.arrayOf(PropTypes.object),
    rightButtons: PropTypes.arrayOf(PropTypes.object),
    showBackButton: PropTypes.bool,
    onBackPress: PropTypes.func,
    showDrawerButton: PropTypes.bool,
    onDrawerPress: PropTypes.func,
    leftView: PropTypes.element,
    centerView: PropTypes.element,
    rightView: PropTypes.element,
  }

  static defaultProps = {
    styles: {},
    showStatusBar: true,
    titlePosition: 'center',
    leftButtons: [],
    rightButtons: [],
  }

  render() {
    let key = 0
    const titleText = this.props.title ? (
      <Text
        key={key++}
        style={[styles.titleText, this.props.styles.titleText]}>
        {this.props.title}
      </Text>
    ) : null

    const leftButtons = this.props.leftButtons.map(button => (
      <ImageButton
        key={key++}
        style={[styles.button, this.props.styles.button]}
        styles={{
          image: [styles.buttonImage, this.props.styles.buttonImage],
        }}
        {...button}
      />
    ))

    const rightButtons = this.props.rightButtons.map(button => (
      <ImageButton
        key={key++}
        style={[styles.button, this.props.styles.button]}
        styles={{
          image: [styles.buttonImage, this.props.styles.buttonImage],
        }}
        {...button}
      />
    ))

    const backButton = this.props.showBackButton ? (
      <ImageButton
        key={key++}
        style={[styles.button, this.props.styles.button]}
        styles={{ image: styles.buttonImage, ...this.props.styles.buttonStyles }}
        source={ Platform.OS === 'android'
            ? require('../resources/ic_header_back_android.png')
            : require('../resources/ic_header_back_ios.png')
        }
        onPress={this.props.onBackPress}
      />
    ) : null

    const drawerButton = this.props.showDrawerButton ? (
      <ImageButton
        key={key++}
        style={[styles.button, this.props.styles.button]}
        styles={{ image: styles.buttonImage, ...this.props.styles.buttonStyles }}
        source={require('../resources/ic_header_drawer.png')}
        onPress={this.props.onDrawerPress}
      />
    ) : null

    const leftView = this.props.leftView ? React.cloneElement(
      this.props.leftView,
      { key: key++ },
    ) : null

    const centerView = this.props.centerView ? React.cloneElement(
      this.props.centerView,
      { key: key++ },
    ) : null

    const rightView = this.props.rightView ? React.cloneElement(
      this.props.rightView,
      { key: key++ },
    ) : null

    const leftViews = []
    if (backButton) {
      leftViews.push(backButton)
    }
    if (drawerButton) {
      leftViews.push(drawerButton)
    }
    leftViews.push(...leftButtons)
    if (leftView) {
      leftViews.push(leftView)
    }
    if (titleText && this.props.titlePosition === 'left') {
      leftViews.push(titleText)
    }
    for (let i = leftViews.length - 1; i > 0; i--) {
      leftViews.splice(i, 0, (
        <View key={key++} style={Theme.styles.hSpace}/>
      ))
    }

    const centerViews = []
    if (centerView) {
      centerViews.push(centerView)
    } else if (titleText && this.props.titlePosition === 'center') {
      centerViews.push(titleText)
    }

    const rightViews = []
    if (titleText && this.props.titlePosition === 'right') {
      rightViews.push(titleText)
    }
    if (rightView) {
      rightViews.push(rightView)
    }
    rightViews.push(...rightButtons)
    for (let i = rightViews.length - 1; i > 0; i--) {
      rightViews.splice(i, 0, (
        <View key={key++} style={Theme.styles.hSpace}/>
      ))
    }

    return (
      <View style={[styles.container, this.props.style]}>
        {
          this.props.showStatusBar ? (
            <StatusBar style={this.props.styles.statusBar}/>
          ) : null
        }
        <View style={styles.content}>
          <View style={styles.left}>
            {leftViews}
          </View>
          <View style={Theme.styles.hSpace}/>
          <View style={styles.center}>
            {centerViews}
          </View>
          <View style={Theme.styles.hSpace}/>
          <View style={styles.right}>
            {rightViews}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colorPrimary,
  },
  content: {
    height: Platform === 'ios' ? 44 : 56, paddingHorizontal: 10,
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
  },
  center: {
    flexDirection: 'row', alignItems: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center',
  },
  titleText: {
    fontSize: Platform === 'ios' ? 18 : 20,
    color: Theme.textColorPrimaryInverse, fontWeight: 'bold',
  },
})
