import React, { createContext, useEffect, useState, useMemo } from 'react'

const CurrentLotteryContext = createContext({})

function WithCurrentLottery ({ children }) {
  const [value, setValue] = useState({})

  const setLottery = (key, { data = null, error = false, loaded = true, refreshData }) => {
    const countdown = data?.timer.leftSeconds || 0
    value[key] = {
      ...value[key],
      key,
      data,
      loaded,
      error,
      refreshData,
      countdown
    }
    setValue({ ...value })
  }
  const unsetLottery = (key) => {
    setValue({
      ...value,
      [key]: {
        ...value[key],
        loaded: false,
        error: false
      }
    })
  }
  const getLottery = (key) => {
    let ret = value[key]
    if (!ret) {
      ret = {
        data: null,
        loaded: false,
        error: false
      }
    }
    return ret
  }
  const updateLotteryCountdown = (key, countdown) => {
    value[key].countdown = countdown
    setValue({ ...value })
  }

  const contextValue = useMemo(() => ({
    getLottery,
    setLottery,
    unsetLottery,
    updateLotteryCountdown
  }), [
    getLottery,
    setLottery,
    unsetLottery,
    updateLotteryCountdown
  ])

  return <CurrentLotteryContext.Provider value={contextValue}>
    {children}
  </CurrentLotteryContext.Provider>
}

export {
  WithCurrentLottery,
  CurrentLotteryContext
}
