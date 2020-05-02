function throwInvalidName () {
  throw new TypeError('Invalid Name')
}

function throwUnknownName () {
  throw new TypeError('Invalid Unknown')
}

class PrivatePropertyStore {
  constructor (context) {
    this.context = null
    this.symbols = {}
    this.properties = {}
  }

  setSymbol (name) {
    this.symbols[name] =
      this.symbols[name] && typeof this.symbols[name] === 'symbol'
        ? this.symbols[name] : Symbol(name)
  }

  getSymbol (name) {
    if (this.symbols[name] && typeof this.symbols[name] === 'symbol') {
      return this.symbols[name]
    } else {
      throwUnknownName()
    }
  }

  set (name, value) {
    const sym = this.getSymbol(name)
    this.properties[sym] = value
    return this.properties[sym]
  }

  get (name) {
    const sym = this.getSymbol(name)
    return this.properties[sym]
  }

  attrReader (...names) {
    names.forEach(n => {
      if (typeof n === 'string') {
        this.setSymbol(n)
        Object.defineProperty(this.context, n, {
          get: () => this.get(n)
        })
      } else {
        throwInvalidName()
      }
    })
  }

  attrWriter (...names) {
    names.forEach(n => {
      if (typeof n === 'string') {
        this.setSymbol(n)
        Object.defineProperty(this.context, n, {
          get: () => undefined,
          set: (value) => this.set(n, value)
        })
      } else {
        throwInvalidName()
      }
    })
  }

  attrAccessor (...names) {
    names.forEach(n => {
      if (typeof n === 'string') {
        this.setSymbol(n)
        Object.defineProperty(this.context, n, {
          get: () => this.get(n),
          set: (value) => this.set(n, value)
        })
      } else {
        throwInvalidName()
      }
    })
  }

  attr (...names) {
    names.forEach(n => {
      if (typeof n === 'string') {
        this.setSymbol(n)
      } else {
        throwInvalidName()
      }
    })
  }
}

function createPrivatePropertyStore () {
  const store = new PrivatePropertyStore()
  const {
    set, get, attrReader, attrWriter, attrAccessor
  } = store

  class WithPrivateProperties {
    constructor () {
      store.context = this
    }
  }

  const ret = {
    set: store::set,
    get: store::get,
    attrReader: store::attrReader,
    attrWriter: store::attrWriter,
    attrAccessor: store::attrAccessor,
    WithPrivateProperties
  }

  Object.defineProperties(ret, {
    $store: { get () { return store } },
    $symbols: { get () { return store.symbols } },
    $properties: { get () { return store.properties } }
  })

  return ret
}

export {
  createPrivatePropertyStore,
  createPrivatePropertyStore as default
}
