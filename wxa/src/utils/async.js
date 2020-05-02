(!wx.$async
  ? () => {
    function asyncDo (api) {
      return (options, ...params) => {
        let task
        function executor (resolve, reject) {
          task = api(Object.assign(options || {}, { success: resolve, fail: reject }), ...params)
        }
        return Object.defineProperty(new Promise(executor), 'task', { value: task })
      }
    }

    const asyncApis = {}

    Object.keys(wx).forEach(k => {
      asyncApis[k] = asyncDo(wx[k])
    })

    Object.defineProperty(wx, '$async', {
      get: () => asyncApis
    })
  }
  : () => {})()
