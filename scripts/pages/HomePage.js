import { computed } from 'mobx'
import { observer } from 'mobx-react'
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { TabBar, TabView } from 'react-native-tab-view'

import { bindMethod, bindObserver } from '../utils/decorators'
import * as Theme from '../utils/theme'
import Text from '../widgets/Text'

import GamePage from './GamePage'
import IdentityPage from './IdentityPage'
import MinePage from './MinePage'
import WalletPage from './WalletPage'

@observer
export default class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 'Wallet',
    }
  }

  @computed.struct get routes() {
    return [
      { key: 'Wallet', title: 'Wallet', component: WalletPage },
      { key: 'Identity', title: 'Identity', component: IdentityPage },
      { key: 'Game', title: 'Game', component: GamePage },
      { key: 'Mine', title: 'Mine', component: MinePage },
    ]
  }

  @bindMethod onTabIndexChange(index) {
    this.setState({ currentPage: this.routes[index].key })
  }

  render() {
    const navigationState = {
      routes: this.routes,
      index: this.routes.findIndex(route => route.key === this.state.currentPage)
    }

    return(
      <View style={Theme.styles.flex1}>
        <TabView
          tabBarPosition="bottom"
          navigationState={navigationState}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderTabPage}
          onIndexChange={this.onTabIndexChange}
          animationEnabled={false}
          swipeEnabled={false}
        />
        <View style={styles.bottomInset}/>
      </View>
    )
  }

  @bindObserver renderTabBar(props) {
    return (
      <TabBar
        {...props}
        style={styles.tabBar}
        tabStyle={styles.tabBarItem}
        indicatorStyle={styles.tabBarIndicator}
        renderLabel={this.renderTabBarItemText}
      />
    )
  }

  @bindObserver renderTabBarItemText({ route }) {
    const focused = this.state.currentPage === route.key
    return (
      <Text style={focused ? styles.tabBarItemFocusedText : styles.tabBarItemText}>
        {route.title}
      </Text>
    )
  }

  @bindObserver renderTabPage({ route }) {
    return (
      <route.component
        navigation={this.props.navigation}
      />
    )
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Theme.contentBackgroundColor,
    shadowColor: 'black', shadowOpacity: 0.1, shadowRadius: 4,
    elevation: 20,
  },
  tabBarItem: {
    paddingVertical: 15,
  },
  tabBarItemText: {
    fontSize: 16,
  },
  tabBarItemFocusedText: {
    fontSize: 16, color: Theme.textColorHint,
  },
  tabBarIndicator: {
    height: 0,
  },
  bottomInset: {
    height: Theme.bottomInsetHeight,
    backgroundColor: Theme.contentBackgroundColor,
  },
})
