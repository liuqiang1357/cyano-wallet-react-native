import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native'

export const colorPrimary = '#32b4d2'
export const colorPrimaryDark = '#32b4d2'
export const colorAccent = '#32b4d2'

export const backgroundColor = '#f2f2f2'
export const contentBackgroundColor = '#ffffff'
export const inputLineBackgroundColor = '#bfbfbf'
export const dividerBackgroundColor = '#e0e0e0'

export const textColorPrimary = '#404040'
export const textColorPrimaryInverse = '#ffffff'
export const textColorSecondary = '#7f7f7f'
export const textColorSecondaryInverse = '#ffffff'
export const textColorTertiary = '#9f9f9f'
export const textColorTertiaryInverse = '#ffffff'
export const textColorHint = '#32b4d2'
export const textColorHintInverse = '#ffffff'

const isIPhoneX = (() => {
  const X_WIDTH = 375
  const X_HEIGHT = 812
  const XSMAX_WIDTH = 414
  const XSMAX_HEIGHT = 896
  const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window')
  return ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
    (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT)) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
})()

export const statusBarHeight = Platform.OS === 'android'
  ? StatusBar.currentHeight : isIPhoneX ? 44 : 20
export const bottomInsetHeight = Platform.OS === 'ios' && isIPhoneX ? 16 : 0

export const styles = StyleSheet.create({
  flex1: { flex: 1 },
  fSpace: { flex: 1 },
  hSpace: { width: 10 },
  hSpace2: { width: 20 },
  hSpace3: { width: 30 },
  hSpace4: { width: 40 },
  hSpaceHalf: { width: 5 },
  vSpace: { height: 10 },
  vSpace2: { height: 20 },
  vSpace3: { height: 30 },
  vSpace4: { height: 40 },
  vSpaceHalf: { height: 5 },
  hLine: {
    alignSelf: 'stretch', height: StyleSheet.hairlineWidth,
    backgroundColor: dividerBackgroundColor,
  },
  vLine: {
    width: StyleSheet.hairlineWidth, alignSelf: 'stretch',
    backgroundColor: dividerBackgroundColor,
  },
  iconImage: {
    width: 24, height: 24,
  },
  smallIconImage: {
    width: 16, height: 16,
  },
})

export const stackTransitionConfig = () => ({
  screenInterpolator: props => {
    const { navigation, layout, position, scene } = props
    if (!layout.isMeasured) {
      const focused = navigation.state.index === scene.index
      const opacity = focused ? 1 : 0
      const translate = focused ? 0 : 1000000
      return {
        opacity,
        transform: [{ translateX: translate }, { translateY: translate }],
      }
    }
    const index = scene.index;
    const inputRange = [index - 1, index, index + 0.99, index + 1]
    const width = layout.initWidth + 30
    const opacity = position.interpolate({
      inputRange,
      outputRange: [1, 1, 0.3, 0],
    })
    const translateY = 0;
    const translateX = position.interpolate({
      inputRange,
      outputRange: [width, 0, -10, -10],
    })
    return {
      opacity,
      transform: [{ translateX }, { translateY }],
    }
  },
})
