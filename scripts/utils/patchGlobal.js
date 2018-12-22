import { setLivelynessChecking } from 'mobx-state-tree'

export default function patchGlobal() {
  Promise.prototype.finally = function (callback) {
    return this.then(
      value => Promise.resolve(callback()).then(() => value),
      reason => Promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }

  if (__DEV__) {
    require('YellowBox').ignoreWarnings([
      "Require cycle: node_modules",
      "Warning: ",
      "unknown call: \"relay:check\""
    ])
  }

  setLivelynessChecking('ignore')
}
