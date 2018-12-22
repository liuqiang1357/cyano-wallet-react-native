import { types } from 'mobx-state-tree'
import { Wallet } from 'ontology-ts-sdk';

import * as AccountAPI from '../api/accountApi'
import * as AuthAPI from '../api/authApi'
import StorageService from '../services/StorageService'
import { flowMap } from '../utils/mobxUtils'

export default types.model('AuthStore', {
  auth: types.maybeNull(types.string),
}).views(self => ({
  get wallet() {
    return self.auth && AuthAPI.getWallet(self.auth)
  },
})).actions(self => flowMap({
  *saveAuth(auth) {
    yield StorageService.set('auth', auth)
    self.auth = auth
  },

  *clearAuth() {
    yield StorageService.remove('auth')
    self.auth = null
  },

  *loadAuth() {
    const auth = yield StorageService.get('auth')
    self.auth = auth
  },

  *accountSignUp(password) {
    const auth = AccountAPI.accountSignUp(String(password)).wallet
    yield self.saveAuth(auth)
  },

  *accountImportPrivateKey(password) {
    const auth = AccountAPI.accountImportPrivateKey(String(password)).wallet
    yield self.saveAuth(auth)
  }
}))
