import React, { Component } from 'react'
import DialogAndroid from 'react-native-dialogs'

export default class ItemPicker extends Component {
  open(options) {
    const {
      title,
      items,
      value,
      onItemPick,
      onCancel,
    } = options || {}

    const finalItems = (items || [])
      .map(item => ({ label: item.label, id: item.value, item }))

    DialogAndroid.showPicker(title, null, {
      type: DialogAndroid.listRadio,
      items: finalItems,
      selectedId: value,
      positiveText: '确定',
      negativeText: '取消',
    }).then(result => {
      const { selectedItem } = result
      if (selectedItem) {
        onItemPick?.(selectedItem.item)
      } else {
        onCancel?.()
      }
    })
  }

  render() {
    return null
  }
}
