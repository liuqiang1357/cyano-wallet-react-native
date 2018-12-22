import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  UIManager,
  View,
} from 'react-native'

import { bindMethod } from '../utils/decorators'
import * as Theme from '../utils/theme'

import Text from './Text'

const isAndroid = Platform.OS === 'android'
const Touchable = isAndroid ? TouchableNativeFeedback : TouchableOpacity

export default class Dialog extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleColor: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      onPress: PropTypes.func,
      disabled: PropTypes.bool,
    })),
    buttonColor: PropTypes.string,
    cancellable: PropTypes.bool,
    animationDuration: PropTypes.number,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    title: 'Dialog',
    titleColor: 'rgba(0,0,0,0.8)',
    buttons: [],
    buttonColor: Platform.OS === 'android' ? Theme.colorPrimary : '#007aff',
    cancellable: true,
    animationDuration: 200,
  }

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      contentRect: null,
    }
    this.animatedVal = new Animated.Value(0)
    this.animationTimingStart = Animated.timing(
      this.animatedVal,
      {
        toValue: 1,
        duration: this.props.animationDuration,
      }
    )
    this.animationTimingEnd = Animated.timing(
      this.animatedVal,
      {
        toValue: 0,
        duration: this.props.animationDuration,
      }
    )
  }

  open() {
    this.setState({ visible: true }, () => this.animationTimingStart.start())
  }

  close() {
    this.animationTimingEnd.start(() => this.setState({ visible: false }))
  }

  @bindMethod onButtonPress(button) {
    button.onPress?.()
    this.close()
  }

  @bindMethod onRequestClose() {
    this.props.onCancel?.()
    this.props.cancellable && this.close()
  }

  render() {
    let key = 0
    const bottomViews = []
    for (const button of this.props.buttons) {
      if (bottomViews.length !== 0 && Platform.OS === 'ios') {
        bottomViews.push(
          <View key={key++} style={Theme.styles.vLine}/>
        )
      }
      bottomViews.push(
        <Touchable
          key={key++}
          disabled={button.disabled}
          onPress={() => this.onButtonPress(button)}>
          <View style={styles.button}>
            <Text style={[styles.buttonText,
              { color: button.disabled ? '#bdbdbd': this.props.buttonColor }]}>
              {button.text}
            </Text>
          </View>
        </Touchable>
      )
    }

    const windowSize = Dimensions.get('window')
    return (
      <Modal
        visible={this.state.visible}
        transparent
        onRequestClose={this.onRequestClose}>
        <Animated.View style={[styles.background, { opacity: this.animatedVal }]}
          onStartShouldSetResponder={value => {
            const nativeEvent = value.nativeEvent
            const contentRect = this.state.contentRect
            if (nativeEvent && contentRect) {
              return nativeEvent.pageX < contentRect.pageX
                || nativeEvent.pageX > contentRect.pageX + contentRect.width
                || nativeEvent.pageY < contentRect.pageY
                || nativeEvent.pageY > contentRect.pageY + contentRect.height
            }
            return false
          }}
          onResponderTerminationRequest={() => false}
          onResponderRelease={this.onRequestClose}>
          <Animated.View style={[styles.content, { opacity: this.animatedVal }]}
            onLayout={value => {
              UIManager.measure(
                value.nativeEvent.target,
                (positionX, positionY, width, height, pageX, pageY) => {
                  this.setState({ contentRect: { width, height, pageX, pageY } })
                },
              )
            }}>
            <View style={styles.top}>
              <Text style={[styles.titleText, { color: this.props.titleColor }]}>
                {this.props.title}
              </Text>
            </View>
            <ScrollView style={{ maxHeight: windowSize.height * 0.5 }}>
              {this.props.children}
            </ScrollView>
            {
              Platform.OS === 'ios' ? (
                <View style={Theme.styles.hLine}/>
              ) : null
            }
            {
              this.props.buttons ? (
                <View style={styles.bottom}>
                  {bottomViews}
                </View>
              ) : null
            }
          </Animated.View>
        </Animated.View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.58)', opacity: 0,
  },
  content: {
    width: '90%',
    opacity: 0,
    ...Platform.select({
      ios: {
        backgroundColor: Theme.backgroundColor,
        borderRadius: 5,
        shadowColor: 'black', shadowOpacity: 0.2, shadowRadius: 5,
        shadowOffset: { width: 1, height: 2 },
      },
      android: {
        backgroundColor: Theme.contentBackgroundColor,
        elevation: 5, borderRadius: 3,
      },
    }),
  },
  top: {
    padding: 20, paddingBottom: 0,
  },
  titleText: {
    fontSize: 20,
    ...Platform.select({
      ios: {
        textAlign: 'center', fontWeight: 'bold',
      },
    }),
  },
  bottom: {
    flexDirection: 'row', alignItems: 'center',
    ...Platform.select({
      ios: {
        justifyContent: 'space-around',
      },
      android: {
        paddingHorizontal: 20,
        justifyContent: 'flex-end',
      },
    }),
  },
  button: {
    padding: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  buttonText: {
    ...Platform.select({
      ios: {
        fontSize: 18,
      },
    }),
  },
})
