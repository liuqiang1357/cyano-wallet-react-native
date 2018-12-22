import { Observer } from 'mobx-react'
import React from 'react'

export function bindMethod(target, key, { value: fn }) {
  return {
    configurable: true,
    get() {
      const value = fn.bind(this)
      Object.defineProperty(this, key, {
        value,
        configurable: true,
        writable: true
      })
      return value
    }
  }
}

export function bindObserver(target, key, { value: fn }) {
  return {
    configurable: true,
    get() {
      const value = (...args) => {
        return <Observer>{fn.bind(this, ...args)}</Observer>
      }
      Object.defineProperty(this, key, {
        value,
        configurable: true,
        writable: true
      })
      return value
    }
  }
}
