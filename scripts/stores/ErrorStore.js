import { comparer } from 'mobx'
import { types } from 'mobx-state-tree'

import ErrorService from '../services/ErrorService'
import * as Configs from '../utils/configs'
import { flowMap } from '../utils/mobxUtils'

export default types.model('ErrorStore', {
  lastError: types.maybeNull(types.frozen()),
}).actions(self => flowMap({
  afterAttach() {
    ErrorService.configure({
      onUnhandled: error => self.publishError(error),
    })
  },

  publishError(error) {
    if (Configs.LOG_UNHANDLED_ERROR) {
      console.log(error)
    }
    self.lastError = comparer.structural(self.lastError, error)
      ? self.lastError : error
  },

  clearError(error) {
    self.lastError = comparer.structural(self.lastError, error)
      ? null : self.lastError
  }
}))
