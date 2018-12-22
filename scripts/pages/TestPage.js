
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Button,
  Alert,
} from 'react-native'
import axios from 'axios'
import asyncScrypt from 'scrypt-async'

import * as AccountAPI from '../api/accountApi'
import * as AuthAPI from '../api/authApi'

export default class TestPage extends Component {
  constructor(props) {
    super(props)
    this.wallet = null
  }

  onButton0Press = async () => {
    axios.get('https://angry.im/t/AjzdI2').finally(value => {
    }).then(value => {
      Alert.alert('alert', JSON.stringify(value))
    })
  }

  onButton1Press = () => {
    asyncScrypt('123456', [12, 34, 56, 78], {
      N: 4096,
      r: 8,
      p: 8,
      dkLen: 64,
    }, result => {
      Alert.alert('alert', JSON.stringify(result))
    })
  }

  onButton2Press = () => {
    const json = AccountAPI.accountSignUp('123456', false).wallet
    this.wallet = AuthAPI.getWallet(json)
    console.log(this.wallet)
    Alert.alert('alert', JSON.stringify(this.wallet))
  }

  onButton3Press = () => {
    const privateKey = AccountAPI.decryptAccount(this.wallet, '123456')
    console.log(privateKey)
    Alert.alert('alert', JSON.stringify(privateKey))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="test0"
          onPress={this.onButton0Press}
        />
        <Button
          title="test1"
          onPress={this.onButton1Press}
        />
        <Button
          title="test2"
          onPress={this.onButton2Press}
        />
        <Button
          title="test3"
          onPress={this.onButton3Press}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
})
