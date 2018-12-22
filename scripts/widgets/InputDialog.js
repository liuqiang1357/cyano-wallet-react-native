import React, { Component } from 'react'
import {
  PickerIOS,
  StyleSheet,
} from 'react-native'

import { bindMethod } from '../utils/decorators'
import * as Theme from '../utils/theme'

import Dialog from './Dialog'
import Input from './Input'

export default class InputDialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: null,
      text: null,
    }
  }

  open(options) {
    let {
      text,
    } = options || {}

    text = text || ''

    this.setState({ text, options })
    this.dialog.open()
  }

  @bindMethod onConfirm() {
    this.state.options?.onTextInput?.(this.state.text)
  }

  @bindMethod onCancel() {
    this.state.options?.onCancel?.()
  }

  render() {
    const {
      title,
      placeholder,
    } = this.state.options || {}

    return (
      <Dialog
        ref={ref => this.dialog = ref}
        title={title}
        buttons={[
          { text: '取消', onPress: this.onCancel },
          { text: '确定', onPress: this.onConfirm },
        ]}
        onCancel={this.onCancel}>
        <Input
          style={styles.input}
          autoFocus
          placeholder={placeholder}
          value={this.state.text}
          onChangeText={value => this.setState({ text: value })}
        />
      </Dialog>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1, paddingHorizontal: 10, paddingVertical: 5, margin: 20,
    backgroundColor: Theme.contentBackgroundColor,
    borderWidth: 1, borderRadius: 3, borderColor: Theme.dividerBackgroundColor,
  },
})
