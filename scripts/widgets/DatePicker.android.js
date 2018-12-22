import React, { Component } from 'react'
import { DatePickerAndroid } from 'react-native'

export default class DatePicker extends Component {
  open(options) {
    const {
      onDatePick,
      onCancel,
    } = options || {}

    DatePickerAndroid.open(options)
      .then(({ action, year, month, day }) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          onDatePick?.(new Date(year, month, day))
        } else {
          onCancel?.()
        }
      })
  }

  render() {
    return null
  }
}
