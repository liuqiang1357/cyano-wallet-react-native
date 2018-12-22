import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { bindMethod } from '../utils/decorators'
import * as Theme from '../utils/theme'

import BorderedButton from './BorderedButton'
import Text from './Text'
import Toast from './Toast'

export default class TestRunner extends Component {
  static propTypes = {
    test: PropTypes.func,
  }

  render() {
    const Navigator = createStackNavigator({
      TestPage: { screen: TestPage },
    },{
      initialRouteParams: {
        name: this.props.test.name,
        test: this.props.test,
      },
      navigationOptions: {
        headerStyle: {
          backgroundColor: Theme.colorPrimary,
        },
        headerTintColor: Theme.textColorPrimaryInverse,
      },
      cardStyle: { backgroundColor: Theme.backgroundColor },
    })
    return <Navigator ref={ref => this.navigator = ref }/>
  }
}

class TestPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name'),
    }
  }

  constructor(props) {
    super(props)
    const target = this.props.navigation.getParam('target')
    const name = this.props.navigation.getParam('name')
    const test = this.props.navigation.getParam('test')

    let tests = null
    let pageComponent
    if (name.startsWith('render')) {
      pageComponent = test.bind(target)
    } else if (name.startsWith('test')) {
      tests = test.bind(target)()
      pageComponent = this.renderTests
    } else {
      throw new Error('TestRunner page function should start with render or test')
    }
    this.state = { tests, pageComponent }
  }

  componentDidMount() {
    this.state.tests?.setup?.()
  }

  componentWillUnmount() {
    this.state.tests?.cleanup?.()
  }

  @bindMethod onChildTestPress(target, name, test) {
    if (name.startsWith('run')) {
      test.bind(target)()
    } else if (name.startsWith('render') || name.startsWith('test')) {
      this.props.navigation.push('TestPage', {
        target,
        name,
        test,
      })
    } else {
      throw new Error('TestRunner item function should start with run, render or test')
    }
  }

  render() {
    const PageComponent = this.state.pageComponent
    return (
      <SafeAreaView style={Theme.styles.flex1}>
        <StatusBar backgroundColor={Theme.colorPrimary}/>
        <PageComponent/>
      </SafeAreaView>
    )
  }

  @bindMethod renderTests() {
    let key = 0
    const views = []
    for (const [name, test] of Object.entries(this.state.tests)) {
      if (views.length !== 0) {
        views.push(
          <View key={key++} style={Theme.styles.vSpace}/>
        )
      }
      if (typeof test === 'function') {
        if (name !== 'setup' && name !== 'cleanup') {
          views.push(
            <BorderedButton
              key={key++}
              text={name}
              onPress={() => this.onChildTestPress(this.state.tests, name, test)}
            />
          )
        }
      }
    }
    return (
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {views}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 10,
  },
})
