import DialogAndroid from 'react-native-dialogs'

export default class ActionSheet {
  static open(options) {
    const {
      title,
      buttons,
      onCancel,
    } = options || {}

    const finalButtons = (buttons || [])
      .map(button => ({ label: button.text, button }))

    DialogAndroid.showPicker(title, null, {
      items: finalButtons,
      positiveText: '',
    }).then(result => {
      const { selectedItem } = result
      if (selectedItem) {
        selectedItem.button.onPress?.()
      } else {
        onCancel?.()
      }
    })
  }
}
