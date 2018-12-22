import { ActionSheetIOS } from 'react-native'

export default class ActionSheet {
  static open(options) {
    const {
      title,
      buttons,
      onCancel,
    } = options || {}

    const finalButtons = [...(buttons || []).map(button => button.text), '取消']

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: title,
        options: finalButtons,
        cancelButtonIndex: finalButtons.length - 1,
      },
      id => {
        if (id < finalButtons.length - 1) {
          buttons[id].onPress?.()
        } else {
          onCancel?.()
        }
      },
    )
  }
}
