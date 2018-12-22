import RejectionTracking from 'promise/setimmediate/rejection-tracking'

class ErrorService {
  configure(options) {
    if ('onUnhandled' in options) {
      if (options.onUnhandled) {
        RejectionTracking.enable({
          whitelist: [Error],
          onUnhandled: (id, error) => {
            options.onUnhandled(error)
          },
        })
      } else {
        RejectionTracking.disable()
      }
    }
  }
}

export default new ErrorService()
