import * as mst from 'mobx-state-tree'

export function connectReduxDevtools(remoteDevDep, model) {
  if (!global.__REMOTEDEV__) {
    return
  }
  const server = remoteDevDep.connectViaExtension({ name: mst.getType(model).name })

  const initialState = mst.getSnapshot(model)
  server.init(initialState)

  const sendAction = (prefix, action, snapshot) => {
    const finalAction = {
      type: `${prefix} #${action.id} ${action.name} ${action.postfix}`,
      args: action.args,
      path: action.path,
      parentId: action.parentId,
      rootId: action.rootId,
    }
    server.send(finalAction, snapshot)
  }

  let currentAction = null
  const postfixMap = { action: '', flow_return: 'done', flow_throw: 'failed' }
  const types = Object.keys(postfixMap)

  mst.addMiddleware(model, (call, next) => {
    if (!types.includes(call.type)) {
      return next(call)
    }
    if (call.name.startsWith('_') || call.name.startsWith('@')) {
      return next(call)
    }
    const action = {
      id: call.id,
      name: call.name,
      postfix: postfixMap[call.type],
      args: call.args,
      path: mst.getPath(call.context),
      parentId: call.parentId,
      rootId: call.rootId,
    }
    const lastAction = currentAction
    currentAction = action
    if (lastAction) {
      sendAction('┌', lastAction, mst.getSnapshot(model))
    }
    next(call)
    if (currentAction === action) {
      sendAction('-', action, mst.getSnapshot(model))
      currentAction = null
    }
    if (lastAction) {
      sendAction('└', lastAction, mst.getSnapshot(model))
    }
  }, false)
}

function isGenerator(obj) {
  return typeof obj.next === 'function' && typeof obj.throw === 'function'
}

function isGeneratorFunction(obj) {
  const constructor = obj.constructor
  if (!constructor){
    return false
  }
  if ('GeneratorFunction' === constructor.name
    || 'GeneratorFunction' === constructor.displayName) {
    return true
  }
  return isGenerator(constructor.prototype)
}

export function flowMap(actions) {
  const finalActions = {}
  for (const [key, value] of Object.entries(actions)) {
    if (isGeneratorFunction(value)) {
      finalActions[key] = mst.flow(value)
    } else {
      finalActions[key] = value
    }
  }
  return finalActions
}
