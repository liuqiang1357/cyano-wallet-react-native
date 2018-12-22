import * as Configs from './configs'

const ERROR_STRINGS = {
  'E_CANCELLED_ERROR': null,
}

export function getLocalMessage(error) {
  let localMessage
  if (error.code && error.code in ERROR_STRINGS) {
    localMessage = ERROR_STRINGS[error.code]
  } else {
    localMessage = error.message
  }
  if (Configs.SHOW_ERROR_DETAIL) {
    localMessage += ` <-- ${error.name}: ${error.message}, ${error.code}`
  }
  return localMessage
}
