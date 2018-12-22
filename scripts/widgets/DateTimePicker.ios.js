import React, { Component } from 'react'
import { DatePickerIOS } from 'react-native'

import { bindMethod } from '../utils/decorators'

import Dialog from './Dialog'

export default class DatePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: null,
      options: null,
    }
  }

  open(options) {
    const {
      date,
    } = options || {}

    this.setState({ date, options })
    this.dialog.open()
  }

  @bindMethod onConfirm() {
    this.state.options?.onDateTimePick?.(this.state.date)
  }

  @bindMethod onCancel() {
    this.state.options?.onCancel?.()
  }

  render() {
    const {
      minDate: minimumDate,
      maxDate: maximumDate,
    } = this.state.options || {}

    return (
      <Dialog
        ref={ref => this.dialog = ref}
        title="选择日期"
        buttons={[
          { text: '取消', onPress: this.onCancel },
          { text: '确定', onPress: this.onConfirm },
        ]}
        onCancel={this.onCancel}>
        <DatePickerIOS
          date={this.state.date || new Date()}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          mode="datetime"
          onDateChange={date => this.setState({ date })}
        />
      </Dialog>
    )
  }
}
