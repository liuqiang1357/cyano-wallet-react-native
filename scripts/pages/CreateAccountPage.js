import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'

import { bindMethod } from '../utils/decorators'
import * as Theme from '../utils/theme'
import BorderedButton from '../widgets/BorderedButton'
import Image from '../widgets/Image'
import Input from '../widgets/Input'
import Text from '../widgets/Text'
import Toast from '../widgets/Toast'
import StatusBar from '../widgets/StatusBar'

@inject('authStore')
@observer
export default class CreateAccountPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: undefined,
      passwordAgain: undefined,
    }
  }

  @bindMethod onSignUpPress() {
    if (!this.state.password) {
      return
    }
    if (this.state.password !== this.state.passwordAgain) {
      Toast.show('Passwords must be the same.')
    }
    this.props.authStore.accountSignUp(this.state.password)
    this.props.navigation.goBack()
  }

  @bindMethod onCancelPress() {
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          style={styles.statusBar}
          barStyle="dark-content"
        />
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              style={styles.icon}
              source={require('../resources/logo.png')}
            />
            <View style={Theme.styles.hSpace2} />
            <Text style={styles.titleTopText}>
              New Account
            </Text>
          </View>
          <View style={Theme.styles.vSpace2} />
          <Text style={styles.titleText}>
            Enter your passphrase for account encryption.
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.inputLabelText}>
            Password
          </Text>
          <View style={Theme.styles.vSpace2} />
          <Input
            style={styles.input}
            secureTextEntry
            value={this.state.password}
            onTextInput={value => this.setState({ password: value })}
          />
          <View style={styles.hLine} />
          <View style={Theme.styles.vSpace2} />
          <Text style={styles.inputLabelText}>
            Password again
          </Text>
          <View style={Theme.styles.vSpace2} />
          <Input
            style={styles.input}
            secureTextEntry
            value={this.state.passwordAgain}
            onTextInput={value => this.setState({ passwordAgain: value })}
          />
          <View style={styles.hLine} />
          <View style={Theme.styles.vSpace2} />
          <BorderedButton
            style={styles.button}
            styles={{ text: styles.buttonText }}
            text="SIGN UP"
            onPress={this.onSignUpPress}
          />
          <View style={Theme.styles.vSpace2} />
          <BorderedButton
            style={styles.button}
            styles={{ text: styles.buttonText }}
            text="CANCEL"
            onPress={this.onCancelPress}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.contentBackgroundColor,
  },
  statusBar: {
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  header: {
    padding: 20,
    backgroundColor: Theme.colorPrimary,
  },
  headerTop: {
    flexDirection: 'row', alignItems: 'center',
  },
  icon: {
    width: 50, height: 50,
  },
  titleTopText: {
    fontSize: 30,
    color: Theme.textColorPrimaryInverse,
  },
  titleText: {
    fontSize: 20,
    color: Theme.textColorPrimaryInverse,
  },
  scrollContent: {
    padding: 10, paddingHorizontal: 20,
  },
  inputLabelText: {
    color: Theme.textColorPrimary,
  },
  input: {
    fontSize: 20,
  },
  hLine: {
    alignItems: 'stretch', height: 2,
    backgroundColor: Theme.dividerBackgroundColor,
  },
  button: {
    width: 200, height: 40, alignSelf: 'center',
    backgroundColor: '#ddd', borderRadius: 5,
    shadowColor: '#ddd',
  },
  buttonText: {
    color: Theme.textColorHint, fontSize: 14, fontWeight: 'bold',
  },
})
