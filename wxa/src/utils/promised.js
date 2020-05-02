import React, { useState, useEffect, useMemo } from 'react'
import makeCancelable from 'makecancelable'

const IDLE = 0
const WAITING = 1
const RESOLVED = 2
const REJECTED = 3

function Promised ({ promise, rerenderInputs = [], children }) {
  if (!(typeof children === 'function')) {
    if (Array.isArray(children)) {
      return children.map((i, idx) => (
        <Promised promise={promise} key={`Promised-${idx}`}>
          {i}
        </Promised>
      ))
    }
    return children
  }

  const [promiseState, setPromiseState] = useState(IDLE)
  const [result, setResult] = useState(undefined)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    if (!promise) {
      setPromiseState(IDLE)
      return
    }

    setPromiseState(WAITING)
    setResult(undefined)
    setError(undefined)

    const cancel = makeCancelable(
      promise,
      (res) => {
        setResult(res)
        setPromiseState(RESOLVED)
      },
      (e) => {
        setError(e)
        setPromiseState(REJECTED)
      })
    return () => cancel()
  }, [promise])

  const retMemo = useMemo(() => children({
    state: promiseState,
    result: result,
    error: error,
    isIdle: promiseState === IDLE,
    isWaiting: promiseState === WAITING,
    isResolved: promiseState === RESOLVED,
    isRejected: promiseState === REJECTED
  }), [promiseState, result, error, ...rerenderInputs])

  return retMemo
}

export default Promised
