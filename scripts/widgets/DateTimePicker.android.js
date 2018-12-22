import React, { Component } from 'react'
import { DatePickerAndroid, TimePickerAndroid } from 'react-native'

export default class DateTimePicker extends Component {
  open(options) {
    const {
      onDateTimePick,
      onCancel,
    } = options || {}

    DatePickerAndroid.open(options)
      .then(({ action, year, month, day }) => {
        if (action !== DatePickerAndroid.dismissedAction) {
          TimePickerAndroid.open(options)
            .then(({ action, hour, minute }) => {
              if (action !== TimePickerAndroid.dismissedAction) {
                onDateTimePick?.(new Date(year, month, day, hour, minute))
              } else {
                onCancel?.()
              }
            })
        } else {
          onCancel?.()
        }
      })
  }

  render() {
    return null
  }
}
