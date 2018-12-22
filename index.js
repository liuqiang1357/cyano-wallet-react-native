import './shim.js'
import { AppRegistry } from 'react-native'

require('./scripts/utils/patchGlobal').default()
AppRegistry.registerComponent('CyanoWallet', () => require('./scripts/setup').default)
