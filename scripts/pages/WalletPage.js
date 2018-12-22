import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

import { bindMethod, bindObserver } from '../utils/decorators'
import * as Theme from '../utils/theme'
import BorderedButton from '../widgets/BorderedButton'
import Text from '../widgets/Text'
import Image from '../widgets/Image'
import StatusBar from '../widgets/StatusBar'

@inject('authStore')
@observer
export default class WalletPage extends Component {
  @bindMethod onCreateAccountPress() {
    this.props.navigation.navigate('CreateAccount')
  }

  @bindMethod onImportPrivateKeyPress() {
    this.props.navigation.navigate('ImportPrivateKey')
  }

  @bindObserver renderNoAuthView() {
    return (
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require('../resources/logo.png')}
        />
        <View style={Theme.styles.vSpace2}/>
        <Image
          style={styles.logo1}
          source={require('../resources/logo.png')}
        />
        <View style={Theme.styles.vSpace2}/>
        <Text style={styles.text}>
          Cyano Wallet
        </Text>
        <Text style={styles.text1}>
          an Ontology wallet
        </Text>
        <Text style={styles.text2}>
          To start using Ontology
        </Text>
        <Text style={styles.text2}>
          create new account or import existing
        </Text>
        <View style={Theme.styles.vSpace2}/>
        <BorderedButton
          style={styles.button}
          styles={{ text: styles.buttonText }}
          text="NEW ACCOUNT"
          onPress={this.onCreateAccountPress}
        />
        <View style={Theme.styles.vSpace2}/>
        <BorderedButton
          style={styles.button}
          styles={{ text: styles.buttonText }}
          text="IMPORT PRIVATE KEY"
          onPress={this.onImportPrivateKeyPress}
        />
      </View>
    )
  }

  @bindObserver renderAuthView() {
    return (
      <Text>
        {this.props.authStore.auth}
      </Text>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          style={styles.statusBar}
          barStyle="dark-content"
        />
        {this.props.authStore.auth ? this.renderAuthView() : this.renderNoAuthView()}
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
  content: {
    flex: 1, padding: 10,
    alignItems: 'center',
    backgroundColor: Theme.colorPrimary,
  },
  logo: {
    width: 40, height: 40, alignSelf: 'flex-start',
  },
  logo1: {
    width: 50, height: 50,
  },
  text: {
    fontSize: 30,
    color: Theme.textColorPrimaryInverse,
  },
  text1: {
    fontSize: 16,
    color: Theme.textColorSecondaryInverse,
  },
  text2: {
    fontSize: 18,
    color: Theme.textColorSecondaryInverse,
  },
  button: {
    width: 200, height: 40,
    backgroundColor: '#ddd', borderRadius: 5,
    shadowColor: '#ddd',
  },
  buttonText: {
    color: Theme.textColorHint, fontSize: 14, fontWeight: 'bold',
  },
})
