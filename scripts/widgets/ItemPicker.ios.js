import React, { Component } from 'react'
import { PickerIOS } from 'react-native'

import { bindMethod } from '../utils/decorators'

import Dialog from './Dialog'

export default class ItemPicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: null,
      options: null,
    }
  }

  open(options) {
    const { items } = options || {}
    let { value } = options || {}

    if (items && items.length > 0) {
      const result = items.find(item => item.value === value)
      if (result == null) {
        value = items[0]?.value
      }
    }

    this.setState({ value, options })
    this.dialog.open()
  }

  @bindMethod onConfirm() {
    const {
      items,
      onItemPick,
    } = this.state.options || {}

    if (items) {
      const result = items.find(item => item.value === this.state.value)
      if (result != null) {
        onItemPick?.(result)
      }
    }
  }

  @bindMethod onCancel() {
    this.state.options?.onCancel?.()
  }

  render() {
    const {
      title,
      items,
    } = this.state.options || {}

    const itemPicker = (items || []).map((item, index) => (
      <PickerIOS.Item
        key={index}
        value={item.value}
        label={item.label}
      />
    ))

    return (
      <Dialog
        ref={ref => this.dialog = ref}
        title={title}
        buttons={[
          { text: '取消', onPress: this.onCancel },
          { text: '确定', onPress: this.onConfirm },
        ]}
        onCancel={this.onCancel}>
        <PickerIOS
          selectedValue={this.state.value}
          onValueChange={value => this.setState({ value })}>
          {itemPicker}
        </PickerIOS>
      </Dialog>
    )
  }
}
