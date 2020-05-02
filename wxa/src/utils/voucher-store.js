import React, { useState, useContext, createContext } from 'react'

const VoucherStoreContext = createContext(null)

function WithVoucherStore ({ children }) {
  const [ids, setIds] = useState([])
  const [count, setCount] = useState(0)

  const updateVoucherStore = userInfo => {
    setCount(userInfo?.voucher?.num || 0)
    setIds([...(userInfo?.voucher?.ids || [])])
  }

  const getVoucher = () => {
    if (count <= 0) {
      return null
    }

    const ret = ids[0]
    setCount(count - 1)
    setIds(ids.splice(1))

    return ret
  }

  return <VoucherStoreContext.Provider value={{
    updateVoucherStore,
    getVoucher,
    voucherIds: ids,
    voucherCount: count
  }}>
    {children}
  </VoucherStoreContext.Provider>
}

function useVoucherStore () {
  return useContext(VoucherStoreContext)
}

export {
  useVoucherStore,
  WithVoucherStore
}
