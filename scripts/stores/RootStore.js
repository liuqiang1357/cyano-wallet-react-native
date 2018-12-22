import { types } from 'mobx-state-tree'

import AuthStore from './AuthStore'
import ErrorStore from './ErrorStore'
import LocalStore from './LocalStore'

export default types.model('RootStore', {
  localStore: types.optional(LocalStore, () => LocalStore.create()),
  errorStore: types.optional(ErrorStore, () => ErrorStore.create()),
  authStore: types.optional(AuthStore, () => AuthStore.create()),
})
